using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Admission
    {
        public Admission()
        {
            Follows = new HashSet<Follow>();
        }

        public int Id { get; set; }
        public int NumberOfDay { get; set; }
        public int Inss { get; set; }
        public int BeneficiaryId { get; set; }
        public int AreaId { get; set; }
        public int SpecialtyId { get; set; }
        public string Cie10Id { get; set; }
        public bool Active { get; set; }
        public string Motive { get; set; }
        public int TypeId { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public bool Finished { get; set; }

        public virtual Area Area { get; set; }
        public virtual Beneficiary Beneficiary { get; set; }
        public virtual Cie10 Cie10 { get; set; }
        public virtual User CreateByNavigation { get; set; }
        public virtual Specialty Specialty { get; set; }
        public virtual AdmissionType Type { get; set; }
        public virtual ICollection<Follow> Follows { get; set; }
    }
}
