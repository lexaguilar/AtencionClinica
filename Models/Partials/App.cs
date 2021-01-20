using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AtencionClinica.Models
{    
    public partial class App {
        [NotMapped]
        public string Version { get; set; }
      } 
}
