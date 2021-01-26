using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace AtencionClinica.Controllers
{
    public class ActividadesController : Controller
    {
        private ClinicaContext _db = null;
        public ActividadesController(ClinicaContext db)
        {
            this._db = db;
        }

        [Route("api/percapitas/get/year/{year}/month/{month}")]
        public IActionResult Get(int year, int month)
        {
            var result = _db.Percapitas.Where(x => x.Year == year && x.Month == month);

            return Json(result);
        }

        [Route("api/percapitas/get/inss/{inss}")]
        public IActionResult Get(int inss)
        {

            var result = _db.Percapitas.OrderByDescending(x => x.Id).FirstOrDefault(x => x.Inss == inss);

            return Json(result);
        }

        [HttpPost("api/percapitas/post/file/year/{year}/month/{month}")]
        public IActionResult PostFile(int year, int month, IFormFile file)
        {

            if (_db.Percapitas.Any(x => x.Year == year && x.Month == month))
                return BadRequest($"Ya existe un percapita en la base de datos con el año {year} y mes {month}");

            var cities = _db.Cities.ToArray();

            if (file.Length > 0)
            {
                ISheet sheet;
                using (var stream = file.OpenReadStream())
                {
                    var sFileExtension = file.FileName.Split(".").Last();

                    if (string.IsNullOrEmpty(sFileExtension))
                        return NotFound("No se encontro la extension del archivo");

                    stream.Position = 0;
                    if (sFileExtension == "xls")
                    {
                        HSSFWorkbook hssfwb = new HSSFWorkbook(stream); //This will read the Excel 97-2000 formats  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook  
                    }
                    else
                    {
                        XSSFWorkbook hssfwb = new XSSFWorkbook(stream); //This will read 2007 Excel format  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook   
                    }

                    IRow headerRow = sheet.GetRow(0); //Get Header Row
                    int cellCount = headerRow.LastCellNum;
                    for (int i = (sheet.FirstRowNum + 1); i <= sheet.LastRowNum; i++) //Read Excel File
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue;

                        if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;

                        try
                        {
                            string PatronalId = row.GetCell(0).ToString();
                            string Rason = row.GetCell(1).StringCellValue;
                            DateTime DateAdd = row.GetCell(2).DateCellValue;
                            double Inss = row.GetCell(3).NumericCellValue;
                            string FirstName = row.GetCell(4).StringCellValue;
                            string LastName = row.GetCell(5).StringCellValue;
                            string Identification = row.GetCell(6).StringCellValue;
                            string Adscription = row.GetCell(7).StringCellValue;
                            string CityString = row.GetCell(8).StringCellValue;
                            string Address = row.GetCell(9).StringCellValue;
                            string SexString = row.GetCell(10).StringCellValue;

                            int sexId = SexString == "FEMENINO" ? 2 : 1;

                            int cityId = 0;

                            var cityResult = cities.FirstOrDefault(c => c.Name.ToLower() == CityString.ToLower());
                            if (cityResult != null)
                                cityId = cityResult.Id;

                            _db.Percapitas.Add(new Percapita
                            {
                                Year = year,
                                Month = month,
                                Rason = Rason,
                                PatronalId = PatronalId,
                                Inss = (int)Inss,
                                FirstName = FirstName,
                                LastName = LastName,
                                Adscription = Adscription,
                                DateAdd = DateAdd,
                                Identification = string.IsNullOrEmpty(Identification) ? string.Empty : Identification,
                                Address = string.IsNullOrEmpty(Address) ? string.Empty : Address,
                                SexId = sexId,
                                CityId = cityId
                            });

                        }
                        catch (FormatException ex)
                        {
                            return BadRequest($"Un error ocurrio " + ex.Message);
                        }
                    }

                    _db.SaveChanges();

                    UpdatePercapita(year, month);

                }
            }

            return Json(new
            {
                name = file.FileName,
                size = file.Length
            });
        }

        [Route("api/percapitas/delete/year/{year}/month/{month}")]
        public IActionResult Delete(int year, int month)
        {
            var newestDate = new DateTime(year, month, 1).AddMonths(1);
            if (_db.Percapitas.Any(x => x.Year == newestDate.Year && x.Month == newestDate.Month))
                return BadRequest("No se puede eliminar porque hay un percapita mas reciente o posterior a este");

            var result = _db.Percapitas.Where(x => x.Year == year && x.Month == month);
            if (result != null)
            {
                _db.Percapitas.RemoveRange(result);

                _db.SaveChanges();

                var lastestDate = new DateTime(year, month, 1).AddMonths(-1);
                UpdatePercapita(lastestDate.Year, lastestDate.Month);

            }

            return Json(new { Result = true });
        }

        private int UpdatePercapita(int year, int month)
        {
            var result = 0;
            using (var cn = _db.Database.GetDbConnection())
            {
                using (var cmd = cn.CreateCommand())
                {
                    cmd.CommandText = "EXEC [dbo].[GenerateCustumers] @year,@month,@returnValue";
                    cmd.Parameters.Add(new SqlParameter("@year", SqlDbType.Int) { Value = year });
                    cmd.Parameters.Add(new SqlParameter("@month", SqlDbType.Int) { Value = month });
                    cmd.Parameters.Add(new SqlParameter("@returnValue", SqlDbType.Int) { Value = 0 });

                    cn.Open();
                    result = cmd.ExecuteNonQuery();
                    cn.Close();

                }
            }

            return result;
        }
    }
}
