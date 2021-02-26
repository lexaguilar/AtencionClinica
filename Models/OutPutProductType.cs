using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class OutPutProductType
    {
        public OutPutProductType()
        {
            OutPutProducts = new HashSet<OutPutProduct>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<OutPutProduct> OutPutProducts { get; set; }
    }
}
