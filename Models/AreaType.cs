using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class AreaType
    {
        public AreaType()
        {
            Areas = new HashSet<Area>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Area> Areas { get; set; }
    }
}
