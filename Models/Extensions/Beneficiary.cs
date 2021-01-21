namespace AtencionClinica.Models{
    public partial class Beneficiary : ModelExtension<Beneficiary>  {

        internal string GetFullName(){
            return $"{this.FirstName} {this.LastName}";
        }
    }
}