using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Service
    {
        public Service()
        {
            AreaServices = new HashSet<AreaService>();
            BillDetails = new HashSet<BillDetail>();
            WorkOrderDetails = new HashSet<WorkOrderDetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PriceCalculate { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<AreaService> AreaServices { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual ICollection<WorkOrderDetail> WorkOrderDetails { get; set; }
    }
}
