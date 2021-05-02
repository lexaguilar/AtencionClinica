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
            PrivateWorkOrderDetails = new HashSet<PrivateWorkOrderDetail>();
            ServiceTestBaarDetails = new HashSet<ServiceTestBaarDetail>();
            ServiceTestCultives = new HashSet<ServiceTestCultive>();
            ServiceTestDetails = new HashSet<ServiceTestDetail>();
            WorkOrderDetails = new HashSet<WorkOrderDetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string PriceCalculate { get; set; }
        public bool Active { get; set; }
        public int CurrencyId { get; set; }
        public bool IsCultive { get; set; }

        public virtual Currency Currency { get; set; }
        public virtual ICollection<AreaService> AreaServices { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual ICollection<PrivateWorkOrderDetail> PrivateWorkOrderDetails { get; set; }
        public virtual ICollection<ServiceTestBaarDetail> ServiceTestBaarDetails { get; set; }
        public virtual ICollection<ServiceTestCultive> ServiceTestCultives { get; set; }
        public virtual ICollection<ServiceTestDetail> ServiceTestDetails { get; set; }
        public virtual ICollection<WorkOrderDetail> WorkOrderDetails { get; set; }
    }
}
