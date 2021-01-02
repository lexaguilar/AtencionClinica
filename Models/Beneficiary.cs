using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Beneficiary
    {
        public Beneficiary()
        {
            Admissions = new HashSet<Admission>();
            Appointments = new HashSet<Appointment>();
        }

        public int Id { get; set; }
        public int Inss { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BeneficiaryTypeId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CellNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Identification { get; set; }
        public string Sexo { get; set; }
        public int CityId { get; set; }
        public int BeneficiaryStatusId { get; set; }
        public bool UpdateWithPercapita { get; set; }
        public int RelationshipId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime? LastDateModificationAt { get; set; }
        public string LastModificationBy { get; set; }

        public virtual CustomerStatus BeneficiaryStatus { get; set; }
        public virtual BeneficiaryType BeneficiaryType { get; set; }
        public virtual City City { get; set; }
        public virtual Customer InssNavigation { get; set; }
        public virtual ICollection<Admission> Admissions { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
