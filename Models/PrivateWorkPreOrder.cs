using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateWorkPreOrder
    {
        public PrivateWorkPreOrder()
        {
            PrivateWorkPreOrderDetails = new HashSet<PrivateWorkPreOrderDetail>();
        }

        public int Id { get; set; }
        public int FollowsPrivateId { get; set; }
        public string Observation { get; set; }
        public int DoctorId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public bool Used { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual FollowsPrivate FollowsPrivate { get; set; }
        public virtual ICollection<PrivateWorkPreOrderDetail> PrivateWorkPreOrderDetails { get; set; }
    }
}
