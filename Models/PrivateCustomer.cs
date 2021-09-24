using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateCustomer
    {
        public PrivateCustomer()
        {
            Bills = new HashSet<Bill>();
            GroupProductPrivateCustumers = new HashSet<GroupProductPrivateCustumer>();
            HemoLogDetails = new HashSet<HemoLogDetail>();
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CellNumber { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string Identification { get; set; }
        public int SexId { get; set; }
        public int RegionId { get; set; }
        public int CityId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime? LastDateModificationAt { get; set; }
        public string LastModificationBy { get; set; }
        public int PrivateCustomerStatusId { get; set; }
        public int? Inss { get; set; }
        public int TypeId { get; set; }
        public int? ContractId { get; set; }
        public DateTime? AddAt { get; set; }

        public virtual Contract Contract { get; set; }
        public virtual PrivateCustomerStat PrivateCustomerStatus { get; set; }
        public virtual Sex Sex { get; set; }
        public virtual PrivateCustomerType Type { get; set; }
        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<GroupProductPrivateCustumer> GroupProductPrivateCustumers { get; set; }
        public virtual ICollection<HemoLogDetail> HemoLogDetails { get; set; }
    }
}
