using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class GroupProductPrivateCustumer
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int PrivateCustomerId { get; set; }

        public virtual Group Group { get; set; }
        public virtual PrivateCustomer PrivateCustomer { get; set; }
    }
}
