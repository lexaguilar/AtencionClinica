using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class GroupProduct
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int ProductId { get; set; }
        public double Quantity { get; set; }

        public virtual Group Group { get; set; }
        public virtual Product Product { get; set; }
    }
}
