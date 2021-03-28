using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class AreaProductStock
    {
        public int AreaId { get; set; }
        public int ProductId { get; set; }
        public double Stock { get; set; }
        public decimal CostAvg { get; set; }
        public decimal CostReal { get; set; }
        public double Min { get; set; }
        public decimal Price { get; set; }
        public bool Inherit { get; set; }
        public double? StockMin { get; set; }

        public virtual Area Area { get; set; }
        public virtual Product Product { get; set; }
    }
}
