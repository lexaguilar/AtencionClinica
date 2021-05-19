using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class HemoLog
    {
        public HemoLog()
        {
            HemoLogDetails = new HashSet<HemoLogDetail>();
        }

        public int Id { get; set; }
        public int GroupId { get; set; }
        public DateTime Date { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateAt { get; set; }

        public virtual Group Group { get; set; }
        public virtual ICollection<HemoLogDetail> HemoLogDetails { get; set; }
    }
}
