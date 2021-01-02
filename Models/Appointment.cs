using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Appointment
    {
        public int Id { get; set; }
        public int BeneficiaryId { get; set; }
        public int AreaId { get; set; }
        public int SpecialtyId { get; set; }
        public int DoctorId { get; set; }
        public DateTime DateAppointment { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Area Area { get; set; }
        public virtual Beneficiary Beneficiary { get; set; }
        public virtual User CreateByNavigation { get; set; }
        public virtual Doctor Doctor { get; set; }
        public virtual Specialty Specialty { get; set; }
    }
}
