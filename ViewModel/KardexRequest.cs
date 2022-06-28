using System;

namespace AtencionClinica.ViewModel
{
    public class ProductRequest{
        
        public int AreaId { get; set; }
        public int ProductId { get; set; }
    }

    public class KardexRequest :  ProductRequest{
        public DateTime Date { get; set; }
    }

    public class StockRequest{
         public int? AreaId { get; set; }
        public int? ProductId { get; set; }
        public bool WithStock { get; set; }
    }

    public class ReportRequest{
        public DateTime From { get; set; }
        public DateTime To { get; set; }
         public int AreaId { get; set; }
        public int? ProductId { get; set; }
        public int? DoctorId { get; set; }
    }


}