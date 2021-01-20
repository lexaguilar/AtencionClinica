using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Doctor
    {
        public Doctor()
        {
            Appointments = new HashSet<Appointment>();
            Subsidies = new HashSet<Subsidy>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string MinsaCode { get; set; }
        public int SpecialtyId { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
    }
}
