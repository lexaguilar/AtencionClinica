using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class ProviderState
    {
        public ProviderState()
        {
            Providers = new HashSet<Provider>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Provider> Providers { get; set; }
    }
}
