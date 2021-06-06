namespace AtencionClinica.Models{
    public partial class PrivateCustomer : ModelExtension<PrivateCustomer>  {

        internal string GetFullName(){
            return $"{this.FirstName.Trim()} {this.LastName.Trim()}";
        }
    }
}