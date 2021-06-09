using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwStocksForArea
    {
        public int AreaId { get; set; }
        public string Area { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Um { get; set; }
        public string Presentation { get; set; }
        public double Stock { get; set; }
        public decimal CostAvg { get; set; }
        public decimal CostReal { get; set; }
        public double Min { get; set; }
        public decimal Price { get; set; }
    }
}
