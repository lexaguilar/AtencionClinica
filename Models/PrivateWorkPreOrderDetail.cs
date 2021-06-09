using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateWorkPreOrderDetail
    {
        public int Id { get; set; }
        public int PrivateWorkOrderId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public decimal Costo { get; set; }
        public string Presentation { get; set; }
        public string Um { get; set; }

        public virtual PrivateWorkPreOrder PrivateWorkOrder { get; set; }
        public virtual Product Product { get; set; }
    }
}
