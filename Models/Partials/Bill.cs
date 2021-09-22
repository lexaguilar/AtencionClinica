using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace AtencionClinica.Models
{
    partial class Bill
    {
        [NotMapped]
        public int AreaDoctorId { get; set; }
    }
}
