using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class FollowService
    {
        public FollowService()
        {
            FollowServiceDetails = new HashSet<FollowServiceDetail>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Observacion { get; set; }

        public virtual Follow Follow { get; set; }
        public virtual ICollection<FollowServiceDetail> FollowServiceDetails { get; set; }
    }
}
