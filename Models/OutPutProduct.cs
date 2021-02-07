using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class OutPutProduct
    {
        public OutPutProduct()
        {
            OutPutProductDetails = new HashSet<OutPutProductDetail>();
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
        public int? SourceId { get; set; }
        public int StateId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }

        public virtual Area Area { get; set; }
        public virtual OutPutProductState State { get; set; }
        public virtual OutPutProductType Type { get; set; }
        public virtual ICollection<OutPutProductDetail> OutPutProductDetails { get; set; }
    }
}
