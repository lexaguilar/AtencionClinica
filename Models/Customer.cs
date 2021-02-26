using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Beneficiaries = new HashSet<Beneficiary>();
        }

        public int Inss { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatronalId { get; set; }
        public DateTime DateAdd { get; set; }
        public int CustomerStatusId { get; set; }
        public int CustomerTypeId { get; set; }
        public string Identification { get; set; }

        public virtual CustomerStatus CustomerStatus { get; set; }
        public virtual CustomerType CustomerType { get; set; }
        public virtual ICollection<Beneficiary> Beneficiaries { get; set; }
    }
}
