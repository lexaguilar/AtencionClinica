using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Specialty
    {
        public Specialty()
        {
            Admissions = new HashSet<Admission>();
            Appointments = new HashSet<Appointment>();
            Doctors = new HashSet<Doctor>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Admission> Admissions { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Doctor> Doctors { get; set; }
    }
}
