using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwBillFinished
    {
        public int BillId { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateAt { get; set; }
        public string FullName { get; set; }
        public string Area { get; set; }
        public int Tranferencia { get; set; }
        public string NameService { get; set; }
        public decimal Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
