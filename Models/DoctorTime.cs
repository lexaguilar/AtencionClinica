using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class DoctorTime
    {
        public int DoctorId { get; set; }
        public string Days { get; set; }
        public DateTime StartHour { get; set; }
        public int CountBeneficiarios { get; set; }
        public int TimeMinutesForBeneficiary { get; set; }

        public virtual Doctor Doctor { get; set; }
    }
}
