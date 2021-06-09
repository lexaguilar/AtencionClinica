using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateSendTest
    {
        public PrivateSendTest()
        {
            PrivateSendTestDetails = new HashSet<PrivateSendTestDetail>();
            PrivateServiceTests = new HashSet<PrivateServiceTest>();
        }

        public int Id { get; set; }
        public int PrivateFollowId { get; set; }
        public DateTime Date { get; set; }
        public int DoctorId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Doctor Doctor { get; set; }
        public virtual FollowsPrivate PrivateFollow { get; set; }
        public virtual ICollection<PrivateSendTestDetail> PrivateSendTestDetails { get; set; }
        public virtual ICollection<PrivateServiceTest> PrivateServiceTests { get; set; }
    }
}
