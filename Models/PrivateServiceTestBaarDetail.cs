using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateServiceTestBaarDetail
    {
        public int Id { get; set; }
        public int ServiceTestId { get; set; }
        public int ServiceId { get; set; }
        public DateTime? TestDate { get; set; }
        public int TestNumber { get; set; }
        public string Appearance { get; set; }
        public string ObservationBk { get; set; }
        public string Observation { get; set; }
        public string AppearanceBio { get; set; }

        public virtual Service Service { get; set; }
        public virtual PrivateServiceTest ServiceTest { get; set; }
    }
}
