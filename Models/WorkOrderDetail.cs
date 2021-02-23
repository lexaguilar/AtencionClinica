using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class WorkOrderDetail
    {
        public int Id { get; set; }
        public int WorkOrderId { get; set; }
        public int? ServiceId { get; set; }
        public int? ProductId { get; set; }
        public bool IsService { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public decimal Costo { get; set; }

        public virtual Service Service { get; set; }
        public virtual WorkOrder WorkOrder { get; set; }
    }
}
