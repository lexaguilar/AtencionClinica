using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Cie10
    {
        public Cie10()
        {
            Admissions = new HashSet<Admission>();
            Subsidies = new HashSet<Subsidy>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Admission> Admissions { get; set; }
        public virtual ICollection<Subsidy> Subsidies { get; set; }
    }
}
