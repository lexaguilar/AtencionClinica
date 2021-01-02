using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Percapita
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int PatronalId { get; set; }
        public string Rason { get; set; }
        public int Inss { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Adscription { get; set; }
        public DateTime DateAdd { get; set; }
    }
}
