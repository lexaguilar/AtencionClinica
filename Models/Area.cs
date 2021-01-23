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
            AreaServices = new HashSet<AreaService>();
            Bills = new HashSet<Bill>();
            FollowAreaSources = new HashSet<Follow>();
            FollowAreaTargets = new HashSet<Follow>();
            FollowsPrivateAreaSources = new HashSet<FollowsPrivate>();
            FollowsPrivateAreaTargets = new HashSet<FollowsPrivate>();
            Subsidies = new HashSet<Subsidy>();
            Users = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Admission> Admissions { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<AreaService> AreaServices { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<Follow> FollowAreaSources { get; set; }
        public virtual ICollection<Follow> FollowAreaTargets { get; set; }
        public virtual ICollection<FollowsPrivate> FollowsPrivateAreaSources { get; set; }
        public virtual ICollection<FollowsPrivate> FollowsPrivateAreaTargets { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
