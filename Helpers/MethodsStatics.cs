using System;
using System.Security.Cryptography;
using System.Text;

namespace AtencionClinica
{
    static public class UserHelpers
    {

        static public string GetPasswordHashedSHA256(this string pass)
        {

            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sBuilder = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(pass));
            for(int i =0; i < stream.Length;i++)
                sBuilder.AppendFormat("{0:x2}",stream[i]);
            return sBuilder.ToString();

        }

        internal static string GenerateRndPwd()
        {
            byte[] buffer = new byte[10];
            System.Security.Cryptography.RandomNumberGenerator.Fill(buffer);
            return Convert.ToBase64String(buffer).Substring(0, 8);
        }

        internal  static int CalculateEdad(DateTime birthDate)
        {
            return ((int.Parse(DateTime.Now.ToString("yyyyMMdd")) - int.Parse(birthDate.ToString("yyyyMMdd"))) / 10000);
        }

        //get only numbers from string
        internal static string GetNumbersFromString(string text){
            string numbers = "";
            foreach (char c in text)
            {
                if (char.IsDigit(c))
                    numbers += c;
                else
                    break;
            }
            return numbers;
        }

    
    }
}