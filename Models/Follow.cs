using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Follow
    {
        public Follow()
        {
            FollowServices = new HashSet<FollowService>();
            WorkOrders = new HashSet<WorkOrder>();
        }

        public int Id { get; set; }
        public int AdmissionId { get; set; }
        public int AreaSourceId { get; set; }
        public int AreaTargetId { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Admission Admission { get; set; }
        public virtual Area AreaSource { get; set; }
        public virtual Area AreaTarget { get; set; }
        public virtual ICollection<FollowService> FollowServices { get; set; }
        public virtual ICollection<WorkOrder> WorkOrders { get; set; }
    }
}
