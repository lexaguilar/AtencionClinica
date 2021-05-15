using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceDetail
    {
        public ServiceDetail()
        {
            PrivateServiceTestDetails = new HashSet<PrivateServiceTestDetail>();
            ServiceTestDetails = new HashSet<ServiceTestDetail>();
        }

        public int Id { get; set; }
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string Um { get; set; }
        public string Reference { get; set; }

        public virtual ICollection<PrivateServiceTestDetail> PrivateServiceTestDetails { get; set; }
        public virtual ICollection<ServiceTestDetail> ServiceTestDetails { get; set; }
    }
}
