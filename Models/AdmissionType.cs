using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class AdmissionType
    {
        public AdmissionType()
        {
            Admissions = new HashSet<Admission>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Admission> Admissions { get; set; }
    }
}
