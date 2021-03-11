﻿using System;
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
            WorkPreOrders = new HashSet<WorkPreOrder>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string MinsaCode { get; set; }
        public int SpecialtyId { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public bool Active { get; set; }

        public virtual Specialty Specialty { get; set; }
        public virtual DoctorTime DoctorTime { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
        public virtual ICollection<WorkPreOrder> WorkPreOrders { get; set; }
    }
}
