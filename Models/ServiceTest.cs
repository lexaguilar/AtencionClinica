using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceTest
    {
        public ServiceTest()
        {
            ServiceTestDetails = new HashSet<ServiceTestDetail>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Follow Follow { get; set; }
        public virtual ICollection<ServiceTestDetail> ServiceTestDetails { get; set; }
    }
}
