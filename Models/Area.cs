using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Area
    {
        public Area()
        {
            Admissions = new HashSet<Admission>();
            Appointments = new HashSet<Appointment>();
            FollowAreaSources = new HashSet<Follow>();
            FollowAreaTargets = new HashSet<Follow>();
            Subsidies = new HashSet<Subsidy>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Admission> Admissions { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Follow> FollowAreaSources { get; set; }
        public virtual ICollection<Follow> FollowAreaTargets { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
    }
}
