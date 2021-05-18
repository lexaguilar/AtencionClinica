using System;
using System.Collections.Generic;

#nullable disable

namespace AtencionClinica.Models
{
    public partial class GroupProductsByDay
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int DayOfWeek { get; set; }

        public virtual Group Group { get; set; }
    }
}
