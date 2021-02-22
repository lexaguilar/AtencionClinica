using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwKardex
    {
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public double Quantity { get; set; }
        public double Stocks { get; set; }
    }
}
