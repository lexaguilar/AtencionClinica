using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateServiceTestCultive
    {
        public PrivateServiceTestCultive()
        {
            PrivateServiceTestCultiveAntiBiotics = new HashSet<PrivateServiceTestCultiveAntiBiotic>();
            PrivateServiceTestCultiveFrescs = new HashSet<PrivateServiceTestCultiveFresc>();
        }

        public int Id { get; set; }
        public int ServiceTestId { get; set; }
        public int ServiceId { get; set; }
        public DateTime? TestDate { get; set; }
        public string Name { get; set; }
        public string Gram { get; set; }
        public string Isolated { get; set; }
        public int? Aminas { get; set; }
        public string Observation { get; set; }
        public string Mycologycal { get; set; }

        public virtual Service Service { get; set; }
        public virtual PrivateServiceTest ServiceTest { get; set; }
        public virtual ICollection<PrivateServiceTestCultiveAntiBiotic> PrivateServiceTestCultiveAntiBiotics { get; set; }
        public virtual ICollection<PrivateServiceTestCultiveFresc> PrivateServiceTestCultiveFrescs { get; set; }
    }
}
