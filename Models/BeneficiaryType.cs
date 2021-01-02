using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class BeneficiaryType
    {
        public BeneficiaryType()
        {
            Beneficiaries = new HashSet<Beneficiary>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Beneficiary> Beneficiaries { get; set; }
    }
}
