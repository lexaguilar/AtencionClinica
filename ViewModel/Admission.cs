using System;

namespace AtencionClinica.ViewModel
{
    public partial class AdmissionModel
    {
        public int Id { get; set; }
        public int Inss { get; set; }
        public int BeneficiaryId { get; set; }
        public int AreaId { get; set; }
        public int SpecialtyId { get; set; }
        public string Cie10Id { get; set; }
        public string Reference { get; set; }
        public int DoctorId { get; set; }
        public string Observation { get; set; }
        public DateTime Date { get; set; }
      
        public WorkOrderDetailModel[] WorkOrderDetailModels { get; set; }

       
    }

    public class WorkOrderDetailModel{
        public int WorkOrderId { get; set; }
        public int? ServiceId { get; set; }
        public int? ProductId { get; set; }
        public bool IsService { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public decimal Costo { get; set; }
    }
}