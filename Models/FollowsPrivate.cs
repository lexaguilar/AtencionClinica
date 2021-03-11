using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class FollowsPrivate
    {
        public FollowsPrivate()
        {
            PrivateWorkOrders = new HashSet<PrivateWorkOrder>();
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
        public virtual ICollection<PrivateWorkOrder> PrivateWorkOrders { get; set; }
    }
}
