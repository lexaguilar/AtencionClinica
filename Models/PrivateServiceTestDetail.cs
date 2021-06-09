using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateServiceTestDetail
    {
        public int Id { get; set; }
        public int ServiceTestId { get; set; }
        public int ServiceId { get; set; }
        public int ServiceDetailId { get; set; }
        public string Name { get; set; }
        public string Um { get; set; }
        public string Reference { get; set; }
        public string Result { get; set; }
        public string ResultJson { get; set; }

        public virtual Service Service { get; set; }
        public virtual ServiceDetail ServiceDetail { get; set; }
        public virtual PrivateServiceTest ServiceTest { get; set; }
    }
}
