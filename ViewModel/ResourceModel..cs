using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AtencionClinica.ViewModel
{
    public class ResourceModel
    {
        private bool _canRead;
        private bool _canCreate;
        private bool _canUpdate;
        private bool _canDelete;

        public int ResourceId { get; set; }
        public string Name { get; set; }
        public Action Action { get; set; }



        public bool CanCreate
        {
            get
            {
                return (this.Action & Action.Create) != 0;
            }
            set
            {
                _canCreate = value;
                //this.Action = value? (this.Action | Action.Create):this.Action ^ Action.Create;
            }
        }

        public bool CanRead
        {
            get
            {
                return (this.Action & Action.Read) != 0;
            }
            set
            {
                _canRead = value;
                //this.Action = value ? (this.Action | Action.Read) : this.Action ^ Action.Read;
            }
        }

        public bool CanUpdate
        {
            get
            {
                return (this.Action & Action.Update) != 0;
            }
            set
            {
                _canUpdate = value;
                //this.Action = value ? (this.Action | Action.Update) : this.Action ^ Action.Update;
            }
        }

        public bool CanDelete
        {
            get
            {
                return (this.Action & Action.Delete) != 0;
            }
            set
            {
                _canDelete = value;
                //this.Action = value ? (this.Action | Action.Delete) : this.Action ^ Action.Delete;
            }
        }

        internal Action ComputeAction()
        {
            Action action = Action.None;
            action = _canCreate ? (action | Action.Create) : action & (~Action.Create);
            action = _canRead ? (action | Action.Read) : action & (~Action.Read);
            action = _canUpdate ? (action | Action.Update) : action & (~Action.Update);
            action = _canDelete ? (action | Action.Delete) : action & (~Action.Delete);
            return action;
        }

    }
}
