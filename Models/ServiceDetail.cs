using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceDetail
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int Name { get; set; }
        public string Um { get; set; }
        public string Reference { get; set; }
    }
}
