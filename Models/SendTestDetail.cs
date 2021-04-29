using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class SendTestDetail
    {
        public int Id { get; set; }
        public int SendTestId { get; set; }
        public int Serviceid { get; set; }

        public virtual SendTest SendTest { get; set; }
    }
}
