using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwProductInfo
    {
        public int AreaId { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public string Um { get; set; }
        public string Presentation { get; set; }
        public int StateId { get; set; }
    }
}
