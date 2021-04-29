using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class SendTest
    {
        public SendTest()
        {
            SendTestDetails = new HashSet<SendTestDetail>();
            ServiceTests = new HashSet<ServiceTest>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public DateTime Date { get; set; }
        public int DoctorId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual Follow Follow { get; set; }
        public virtual ICollection<SendTestDetail> SendTestDetails { get; set; }
        public virtual ICollection<ServiceTest> ServiceTests { get; set; }
    }
}
