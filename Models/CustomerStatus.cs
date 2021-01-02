using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class CustomerStatus
    {
        public CustomerStatus()
        {
            Beneficiaries = new HashSet<Beneficiary>();
            Customers = new HashSet<Customer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Beneficiary> Beneficiaries { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
    }
}
