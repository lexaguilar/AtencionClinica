using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Purchase
    {
        public Purchase()
        {
            PurchaseDetails = new HashSet<PurchaseDetail>();
        }

        public int Id { get; set; }
        public int AreaId { get; set; }
        public int PurchaseTypeId { get; set; }
        public DateTime Date { get; set; }
        public int Number { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Import { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public decimal Rate { get; set; }
        public string Observation { get; set; }
        public int CurrencyId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Reference { get; set; }
        public int? ProviderId { get; set; }

        public virtual Area Area { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual Provider Provider { get; set; }
        public virtual PurchaseType PurchaseType { get; set; }
        public virtual PurchaseStatus Status { get; set; }
        public virtual ICollection<PurchaseDetail> PurchaseDetails { get; set; }
    }
}
