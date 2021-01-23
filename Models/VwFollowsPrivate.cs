using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class VwFollowsPrivate
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AreaSource { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public int AreaTargetId { get; set; }
    }
}
