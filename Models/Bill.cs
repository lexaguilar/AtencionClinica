using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Bill
    {
        public Bill()
        {
            BillDetails = new HashSet<BillDetail>();
            FollowsPrivates = new HashSet<FollowsPrivate>();
        }

        public int Id { get; set; }
        public int BillTypeId { get; set; }
        public int AreaId { get; set; }
        public int PrivateCustomerId { get; set; }
        public decimal Total { get; set; }
        public string Observation { get; set; }
        public int CurrencyId { get; set; }
        public bool Active { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public decimal Rate { get; set; }

        public virtual Area Area { get; set; }
        public virtual BillType BillType { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual PrivateCustomer PrivateCustomer { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual ICollection<FollowsPrivate> FollowsPrivates { get; set; }
    }
}
