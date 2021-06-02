using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwLastMedicinesByBeneficiary
    {
        public int BeneficiaryId { get; set; }
        public int WorkOrderId { get; set; }
        public DateTime Date { get; set; }
        public string Product { get; set; }
        public double Quantity { get; set; }
        public string CreateBy { get; set; }
        public string Doctor { get; set; }
    }
}
