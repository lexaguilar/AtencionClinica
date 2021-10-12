using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwTestsByPrivate
    {
        public int TestDetailId { get; set; }
        public int PrivateCustomerId { get; set; }
        public string TestName { get; set; }
        public DateTime CreateAt { get; set; }
        public string Doctor { get; set; }
    }
}
