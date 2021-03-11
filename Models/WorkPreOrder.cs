using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class WorkPreOrder
    {
        public WorkPreOrder()
        {
            WorkPreOrderDetails = new HashSet<WorkPreOrderDetail>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public string Observation { get; set; }
        public int DoctorId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public bool Used { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual Follow Follow { get; set; }
        public virtual ICollection<WorkPreOrderDetail> WorkPreOrderDetails { get; set; }
    }
}
