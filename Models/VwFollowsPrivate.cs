using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwFollowsPrivate
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int BillTypeId { get; set; }
        public string BillTypeName { get; set; }
        public int PrivateCustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? Inss { get; set; }
        public string AreaSource { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int AreaTargetId { get; set; }
        public int PrivateCustomerTypeId { get; set; }
        public string PrivateCustomerTypeName { get; set; }
        public bool Finished { get; set; }
    }
}
