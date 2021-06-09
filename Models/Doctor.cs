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
            PrivateSendTests = new HashSet<PrivateSendTest>();
            PrivateServiceTests = new HashSet<PrivateServiceTest>();
            PrivateWorkOrders = new HashSet<PrivateWorkOrder>();
            PrivateWorkPreOrders = new HashSet<PrivateWorkPreOrder>();
            SendTests = new HashSet<SendTest>();
            ServiceTests = new HashSet<ServiceTest>();
            Subsidies = new HashSet<Subsidy>();
            WorkOrders = new HashSet<WorkOrder>();
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
        public virtual ICollection<PrivateSendTest> PrivateSendTests { get; set; }
        public virtual ICollection<PrivateServiceTest> PrivateServiceTests { get; set; }
        public virtual ICollection<PrivateWorkOrder> PrivateWorkOrders { get; set; }
        public virtual ICollection<PrivateWorkPreOrder> PrivateWorkPreOrders { get; set; }
        public virtual ICollection<SendTest> SendTests { get; set; }
        public virtual ICollection<ServiceTest> ServiceTests { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
        public virtual ICollection<WorkOrder> WorkOrders { get; set; }
        public virtual ICollection<WorkPreOrder> WorkPreOrders { get; set; }
    }
}
