﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class CustomerType
    {
        public CustomerType()
        {
            Customers = new HashSet<Customer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Customer> Customers { get; set; }
    }
}
