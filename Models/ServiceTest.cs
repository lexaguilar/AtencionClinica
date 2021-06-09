using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceTest
    {
        public ServiceTest()
        {
            ServiceTestBaarDetails = new HashSet<ServiceTestBaarDetail>();
            ServiceTestCultives = new HashSet<ServiceTestCultive>();
            ServiceTestDetails = new HashSet<ServiceTestDetail>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public int SendTestId { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int DoctorId { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual Follow Follow { get; set; }
        public virtual SendTest SendTest { get; set; }
        public virtual ICollection<ServiceTestBaarDetail> ServiceTestBaarDetails { get; set; }
        public virtual ICollection<ServiceTestCultive> ServiceTestCultives { get; set; }
        public virtual ICollection<ServiceTestDetail> ServiceTestDetails { get; set; }
    }
}
