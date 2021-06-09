using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateWorkOrder
    {
        public PrivateWorkOrder()
        {
            PrivateWorkOrderDetails = new HashSet<PrivateWorkOrderDetail>();
        }

        public int Id { get; set; }
        public int FollowsPrivateId { get; set; }
        public DateTime Date { get; set; }
        public string Observation { get; set; }
        public string Reference { get; set; }
        public int DoctorId { get; set; }
        public bool Active { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual FollowsPrivate FollowsPrivate { get; set; }
        public virtual ICollection<PrivateWorkOrderDetail> PrivateWorkOrderDetails { get; set; }
    }
}
