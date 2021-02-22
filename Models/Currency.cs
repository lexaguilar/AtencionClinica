using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Currency
    {
        public Currency()
        {
            Bills = new HashSet<Bill>();
            InPutProducts = new HashSet<InPutProduct>();
            OutPutProducts = new HashSet<OutPutProduct>();
            Products = new HashSet<Product>();
            Services = new HashSet<Service>();
            Traslates = new HashSet<Traslate>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }

        public virtual ICollection<Bill> Bills { get; set; }
        public virtual ICollection<InPutProduct> InPutProducts { get; set; }
        public virtual ICollection<OutPutProduct> OutPutProducts { get; set; }
        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Service> Services { get; set; }
        public virtual ICollection<Traslate> Traslates { get; set; }
    }
}
