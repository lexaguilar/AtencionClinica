using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class PrivateSendTestDetail
    {
        public int Id { get; set; }
        public int PrivateSendTestId { get; set; }
        public int Serviceid { get; set; }

        public virtual PrivateSendTest PrivateSendTest { get; set; }
    }
}
