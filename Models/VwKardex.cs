using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwKardex
    {
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public double QuantityIn { get; set; }
        public decimal? CostIn { get; set; }
        public decimal? CostTotalIn { get; set; }
        public double QuantityOut { get; set; }
        public decimal? CostOut { get; set; }
        public decimal? CostTotalOut { get; set; }
        public decimal CostAvg { get; set; }
        public double Stocks { get; set; }
        public int ProductId { get; set; }
        public int AreaId { get; set; }
        public string Reference { get; set; }
        public int Id { get; set; }
    }
}
