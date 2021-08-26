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
        public string PatronalId { get; set; }
        public string Rason { get; set; }
        public int Inss { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Adscription { get; set; }
        public DateTime DateAdd { get; set; }
        public string Identification { get; set; }
        public string Address { get; set; }
        public int? SexId { get; set; }
        public int? CityId { get; set; }
        public int? InssPareja { get; set; }
        public int? InssHijo1 { get; set; }
        public int? InssHijo2 { get; set; }
        public int? InssHijo3 { get; set; }
        public int? InssHijo4 { get; set; }
    }
}
