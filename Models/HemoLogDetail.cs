using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class HemoLogDetail
    {
        public int Id { get; set; }
        public int HemoLogId { get; set; }
        public int PrivateCustomerId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }
        public decimal Cost { get; set; }

        public virtual HemoLog HemoLog { get; set; }
        public virtual PrivateCustomer PrivateCustomer { get; set; }
        public virtual Product Product { get; set; }
    }
}
