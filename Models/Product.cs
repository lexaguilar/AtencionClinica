using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Product
    {
        public Product()
        {
            AreaProductStocks = new HashSet<AreaProductStock>();
            BillDetails = new HashSet<BillDetail>();
            InPutProductDetails = new HashSet<InPutProductDetail>();
            OutPutProductDetails = new HashSet<OutPutProductDetail>();
            PrivateWorkOrderDetails = new HashSet<PrivateWorkOrderDetail>();
            TraslateDetails = new HashSet<TraslateDetail>();
            WorkOrderDetails = new HashSet<WorkOrderDetail>();
            WorkPreOrderDetails = new HashSet<WorkPreOrderDetail>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int FamilyId { get; set; }
        public int PresentationId { get; set; }
        public int UnitOfMeasureId { get; set; }
        public bool HasIva { get; set; }
        public int StateId { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime LastDateModificationAt { get; set; }
        public string LastModificationBy { get; set; }
        public int CurrencyId { get; set; }
        public double? StockMin { get; set; }
        public int? ConvertProductId { get; set; }
        public double? ConvertProductQuantity { get; set; }

        public virtual Currency Currency { get; set; }
        public virtual Family Family { get; set; }
        public virtual Presentation Presentation { get; set; }
        public virtual ProductState State { get; set; }
        public virtual UnitOfMeasure UnitOfMeasure { get; set; }
        public virtual ICollection<AreaProductStock> AreaProductStocks { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
        public virtual ICollection<InPutProductDetail> InPutProductDetails { get; set; }
        public virtual ICollection<OutPutProductDetail> OutPutProductDetails { get; set; }
        public virtual ICollection<PrivateWorkOrderDetail> PrivateWorkOrderDetails { get; set; }
        public virtual ICollection<TraslateDetail> TraslateDetails { get; set; }
        public virtual ICollection<WorkOrderDetail> WorkOrderDetails { get; set; }
        public virtual ICollection<WorkPreOrderDetail> WorkPreOrderDetails { get; set; }
    }
}
