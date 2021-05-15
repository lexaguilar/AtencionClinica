using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class FollowsPrivate
    {
        public FollowsPrivate()
        {
            PrivateSendTests = new HashSet<PrivateSendTest>();
            PrivateServiceTests = new HashSet<PrivateServiceTest>();
            PrivateWorkOrders = new HashSet<PrivateWorkOrder>();
            PrivateWorkPreOrders = new HashSet<PrivateWorkPreOrder>();
        }

        public int Id { get; set; }
        public int BillId { get; set; }
        public int AreaSourceId { get; set; }
        public int AreaTargetId { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Area AreaSource { get; set; }
        public virtual Area AreaTarget { get; set; }
        public virtual Bill Bill { get; set; }
        public virtual ICollection<PrivateSendTest> PrivateSendTests { get; set; }
        public virtual ICollection<PrivateServiceTest> PrivateServiceTests { get; set; }
        public virtual ICollection<PrivateWorkOrder> PrivateWorkOrders { get; set; }
        public virtual ICollection<PrivateWorkPreOrder> PrivateWorkPreOrders { get; set; }
    }
}
