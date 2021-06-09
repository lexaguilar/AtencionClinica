using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateServiceTestCultiveAntiBiotic
    {
        public int Id { get; set; }
        public int ServiceTestCultiveId { get; set; }
        public string TestId { get; set; }
        public int ResultId { get; set; }

        public virtual PrivateServiceTestCultive ServiceTestCultive { get; set; }
    }
}
