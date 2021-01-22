using System;

namespace AtencionClinica.ViewModel
{
    public class ListHours{
        public int Id { get; set; }
        public string Tipo { get; set; }
        public string Nombre { get; set; }
        public DateTime Time { get; set; }
        public bool Disabled { get; set; }
    }
}