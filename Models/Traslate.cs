using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Traslate
    {
        public Traslate()
        {
            TraslateDetails = new HashSet<TraslateDetail>();
        }

        public int Id { get; set; }
        public int AreaSourceId { get; set; }
        public int AreaTargetId { get; set; }
        public DateTime Date { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Import { get; set; }
        public decimal Iva { get; set; }
        public decimal Total { get; set; }
        public decimal Rate { get; set; }
        public string Observation { get; set; }
        public int CurrencyId { get; set; }
        public int StageId { get; set; }
        public int StateId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime? LastDateModificationAt { get; set; }
        public string LastModificationBy { get; set; }
        public string AuthorizedBy { get; set; }
        public DateTime? AuthorizedAt { get; set; }

        public virtual Area AreaSource { get; set; }
        public virtual Area AreaTarget { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual TraslateStage Stage { get; set; }
        public virtual ICollection<TraslateDetail> TraslateDetails { get; set; }
    }
}
