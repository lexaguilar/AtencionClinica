using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ServiceTestCultiveFresc
    {
        public int Id { get; set; }
        public int ServiceTestCultiveId { get; set; }
        public string TestId { get; set; }
        public string ResultId { get; set; }

        public virtual ServiceTestCultive ServiceTestCultive { get; set; }
    }
}
