using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwBeneficiariesActive
    {
        public int Id { get; set; }
        public int Inss { get; set; }
        public int? InssAlternative { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CellNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Identification { get; set; }
        public string Status { get; set; }
        public string Ralation { get; set; }
    }
}
