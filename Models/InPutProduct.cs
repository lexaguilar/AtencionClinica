using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class InPutProduct
    {
        public InPutProduct()
        {
            InPutProductDetails = new HashSet<InPutProductDetail>();
        }

        public int Id { get; set; }
        public int AreaId { get; set; }
        public int TypeId { get; set; }
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
        public int StateId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public string Reference { get; set; }
        public int? ProviderId { get; set; }

        public virtual Area Area { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual Provider Provider { get; set; }
        public virtual InPutProductState State { get; set; }
        public virtual InPutProductType Type { get; set; }
        public virtual ICollection<InPutProductDetail> InPutProductDetails { get; set; }
    }
}
