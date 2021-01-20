using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Relationship
    {
        public Relationship()
        {
            Beneficiaries = new HashSet<Beneficiary>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Rule { get; set; }

        public virtual ICollection<Beneficiary> Beneficiaries { get; set; }
    }
}
