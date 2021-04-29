using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Subsidy
    {
        public int Id { get; set; }
        public int BeneficiaryId { get; set; }
        public int Inss { get; set; }
        public string Reference { get; set; }
        public string Cie10Id { get; set; }
        public int AreaId { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public int Days { get; set; }
        public int DoctorId { get; set; }
        public bool Active { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Identification { get; set; }

        public virtual Area Area { get; set; }
        public virtual Beneficiary Beneficiary { get; set; }
        public virtual Cie10 Cie10 { get; set; }
        public virtual Doctor Doctor { get; set; }
    }
}
