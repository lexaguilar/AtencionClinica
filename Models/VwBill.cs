using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwBill
    {
        public int Id { get; set; }
        public long? RowNumber { get; set; }
        public int ClientId { get; set; }
        public int? DetalleId { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateAt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Inss { get; set; }
        public string TypeCustomer { get; set; }
        public string ContractType { get; set; }
        public string Area { get; set; }
        public int Tranferencia { get; set; }
        public DateTime? RegisterAt { get; set; }
        public string ServiceName { get; set; }
        public int CurrencyId { get; set; }
        public double Quantity { get; set; }
        public decimal? Price { get; set; }
        public double? SubTotal { get; set; }
        public bool Active { get; set; }
        public decimal? Value { get; set; }
        public DateTime? AddAt { get; set; }
        public string Observation { get; set; }
    }
}
