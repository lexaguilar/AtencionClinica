using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class AreaService
    {
        public int Id { get; set; }
        public int AreaId { get; set; }
        public int ServiceId { get; set; }

        public virtual Area Area { get; set; }
        public virtual Service Service { get; set; }
    }
}
