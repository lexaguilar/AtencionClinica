using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class FollowServiceDetail
    {
        public int Id { get; set; }
        public int FollowServiceId { get; set; }
        public int ServiceId { get; set; }
        public decimal Quantity { get; set; }

        public virtual FollowService FollowService { get; set; }
    }
}
