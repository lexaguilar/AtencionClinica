using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceProduct
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual Service Service { get; set; }
    }
}
