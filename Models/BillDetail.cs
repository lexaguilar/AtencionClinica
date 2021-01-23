using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class BillDetail
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int ServiceId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }

        public virtual Bill Bill { get; set; }
        public virtual Service Service { get; set; }
    }
}
