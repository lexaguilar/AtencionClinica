using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class BillType
    {
        public BillType()
        {
            Bills = new HashSet<Bill>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
    }
}
