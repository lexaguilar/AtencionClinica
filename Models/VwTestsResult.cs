using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwTestsResult
    {
        public int Id { get; set; }
        public int Detalle { get; set; }
        public DateTime Date { get; set; }
        public string CreateBy { get; set; }
        public string Doctor { get; set; }
        public string Procedimiento { get; set; }
        public string Examen { get; set; }
        public string Result { get; set; }
        public string Reference { get; set; }
        public string Um { get; set; }
        public int Inss { get; set; }
        public string Paciente { get; set; }
        public string Relationship { get; set; }
        public decimal Edad { get; set; }
    }
}
