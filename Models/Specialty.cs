using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Specialty
    {
        public Specialty()
        {
            Appointments = new HashSet<Appointment>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
