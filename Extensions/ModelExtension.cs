using System;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace AtencionClinica
{
    public abstract class ModelExtension<T> where T : class
    {
        internal void CopyFrom(T source, Expression<Func<T, object>> expression)
        {
            NewExpression body = (NewExpression)expression.Body;

            foreach (MemberExpression arg in body.Arguments.OfType<MemberExpression>())
            {
                var propery = (PropertyInfo)arg.Member;

                if (!propery.CanWrite)
                    continue;

                object value = propery.GetValue(source);
                propery.SetValue(this, value);
            }
        }

        internal void CopyAllFromExcept(T source, Expression<Func<T, object>> expression)
        {
            NewExpression body = (NewExpression)expression.Body;
            var exclude = body.Arguments.Cast<MemberExpression>().Select(x => x.Member.Name);

            var type = typeof(T);
            var properties = type.GetProperties().Where(x => x.CanWrite);
            foreach (var p in properties)
            {
                if (exclude.Contains(p.Name))
                    continue;

                object value = p.GetValue(source);

                p.SetValue(this, value);

            }
        }

        internal void ToUpperCase()
        {
            var type = this.GetType();
            var properties = type.GetProperties().Where(x => x.PropertyType.FullName == "System.String" && x.Name != "Email" && x.Name != "Username");

            foreach (var p in properties)
            {

                object value = p.GetValue(this);
                if(value != null)
                {                   
                    var newValue = ToCapitalText(value.ToString());
                    p.SetValue(this, newValue);
                }

            }
        }

        private string ToCapitalText(string text){

           TextInfo textInfo = new CultureInfo("en-US",false).TextInfo;
           return textInfo.ToTitleCase(text);
           
        }
        
    }
}