using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class TraslateStage
    {
        public TraslateStage()
        {
            Traslates = new HashSet<Traslate>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Traslate> Traslates { get; set; }
    }
}
