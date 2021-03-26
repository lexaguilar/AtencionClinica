using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwBillProductsService
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public decimal GranTotal { get; set; }
        public string Contract { get; set; }
        public string TypeCustomer { get; set; }
        public string TipoIngreso { get; set; }
        public string NameService { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
    }
}
