using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceTestDetail
    {
        public int Id { get; set; }
        public int ServiceTestId { get; set; }
        public int ServiceId { get; set; }
        public int ServiceDetailId { get; set; }
        public string Result { get; set; }
        public string ResultJson { get; set; }

        public virtual Service Service { get; set; }
        public virtual ServiceDetail ServiceDetail { get; set; }
        public virtual ServiceTest ServiceTest { get; set; }
    }
}
