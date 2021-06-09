using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwFollow
    {
        public int Id { get; set; }
        public int AdmissionId { get; set; }
        public int Inss { get; set; }
        public int BeneficiaryId { get; set; }
        public string Relationship { get; set; }
        public string Identification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AreaSource { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int AreaTargetId { get; set; }
        public int AreaSourceId { get; set; }
        public int AdmissionTypeId { get; set; }
        public string AdmissionType { get; set; }
        public bool Finished { get; set; }
    }
}
