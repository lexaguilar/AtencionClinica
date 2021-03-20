using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Sex
    {
        public Sex()
        {
            Beneficiaries = new HashSet<Beneficiary>();
            PrivateCustomers = new HashSet<PrivateCustomer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Beneficiary> Beneficiaries { get; set; }
        public virtual ICollection<PrivateCustomer> PrivateCustomers { get; set; }
    }
}
