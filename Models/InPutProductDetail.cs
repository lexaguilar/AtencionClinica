using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class InPutProductDetail
    {
        public int Id { get; set; }
        public int InPutProductId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Import { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public decimal CostAvg { get; set; }
        public double Stocks { get; set; }

        public virtual InPutProduct InPutProduct { get; set; }
        public virtual Product Product { get; set; }
    }
}
