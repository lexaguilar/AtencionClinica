using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using AtencionClinica.Extensions;
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
    public class RatesController : Controller
    {      
        private ClinicaContext _db = null;
        public RatesController(ClinicaContext db)
        {
            this._db = db;
        }


        [Route("api/rates/get")]
        public IActionResult Get(int skip, int take){
            var result = _db.Rates;
            var items = result.Skip(skip).Take(take);

            return Json(new
            {
                items,
                totalCount = result.Count()
            });
        }


        [Route("api/rates/get/{tickts}")]
        public IActionResult Get(long tickts) 
        {

            var fecha = new DateTime(tickts).Date;
            var result = _db.Rates.FirstOrDefault(x => x.Date == fecha);

            return Json(result);

        } 

        [HttpPost("api/rates/post")]
        public IActionResult Post([FromBody] Rate rate)
        {

            if (rate.Id > 0)
            {
                 _db.Rates.Attach(rate);
                _db.Entry(rate).State = EntityState.Modified;
            }
            else
            {

                var result = _db.Rates.FirstOrDefault(x => x.Date == rate.Date);
                if(result != null){
                    return BadRequest($"Ya existe una tasa de cambio con la fecha {rate.Date}");
                }

                _db.Rates.Add(rate);
                
            }

            _db.SaveChanges();

            return Json(rate);

        }  

        [HttpPost("api/rates/post/file")]  
        public IActionResult Post(IFormFile file)
        {
           
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
                    var rates = new List<Rate>();
                    for (int i = (sheet.FirstRowNum + 1); i <= sheet.LastRowNum; i++) //Read Excel File
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue;

                        if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;

                        try
                        {
                            double value = row.GetCell(1).NumericCellValue;
                            DateTime date = row.GetCell(0).DateCellValue; 

                            rates.Add(new Rate
                            {
                                Value = Convert.ToDecimal(value),
                                Date = date
                            });

                        }
                        catch (FormatException ex)
                        {
                            return BadRequest($"Un error ocurrio "  + ex.Message);
                        }
                    }

                    _db.Rates.AddRange(rates);
                    _db.SaveChanges();
                }
            }


            return Json(new
            {
                name = file.FileName,
                size = file.Length
            });

        }
    }
}
