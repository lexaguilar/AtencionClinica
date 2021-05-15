using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateServiceTest
    {
        public PrivateServiceTest()
        {
            PrivateServiceTestBaarDetails = new HashSet<PrivateServiceTestBaarDetail>();
            PrivateServiceTestCultives = new HashSet<PrivateServiceTestCultive>();
            PrivateServiceTestDetails = new HashSet<PrivateServiceTestDetail>();
        }

        public int Id { get; set; }
        public int FollowId { get; set; }
        public int SendTestId { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int DoctorId { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual FollowsPrivate Follow { get; set; }
        public virtual PrivateSendTest SendTest { get; set; }
        public virtual ICollection<PrivateServiceTestBaarDetail> PrivateServiceTestBaarDetails { get; set; }
        public virtual ICollection<PrivateServiceTestCultive> PrivateServiceTestCultives { get; set; }
        public virtual ICollection<PrivateServiceTestDetail> PrivateServiceTestDetails { get; set; }
    }
}
