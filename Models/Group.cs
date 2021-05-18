using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class Group
    {
        public Group()
        {
            GroupProductPrivateCustumers = new HashSet<GroupProductPrivateCustumer>();
            GroupProducts = new HashSet<GroupProduct>();
            GroupProductsByDays = new HashSet<GroupProductsByDay>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<GroupProductPrivateCustumer> GroupProductPrivateCustumers { get; set; }
        public virtual ICollection<GroupProduct> GroupProducts { get; set; }
        public virtual ICollection<GroupProductsByDay> GroupProductsByDays { get; set; }
    }
}
