using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Provider
    {
        public Provider()
        {
            InPutProducts = new HashSet<InPutProduct>();
            Purchases = new HashSet<Purchase>();
        }

        public int Id { get; set; }
        public string Ruc { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Observation { get; set; }
        public DateTime CreateAt { get; set; }
        public string CreateBy { get; set; }
        public DateTime? LastDateModificationAt { get; set; }
        public string LastModificationBy { get; set; }
        public int StateId { get; set; }

        public virtual ProviderState State { get; set; }
        public virtual ICollection<InPutProduct> InPutProducts { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }
    }
}
