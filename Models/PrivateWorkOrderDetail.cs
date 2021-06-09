using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateWorkOrderDetail
    {
        public int Id { get; set; }
        public int PrivateWorkOrderId { get; set; }
        public int? ServiceId { get; set; }
        public int? ProductId { get; set; }
        public bool IsService { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public decimal Costo { get; set; }

        public virtual PrivateWorkOrder PrivateWorkOrder { get; set; }
        public virtual Product Product { get; set; }
        public virtual Service Service { get; set; }
    }
}
