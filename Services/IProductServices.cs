using AtencionClinica.Factory;
using AtencionClinica.Models;
using AtencionClinica.ViewModel;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;


namespace AtencionClinica.Services
{
    public interface IProductServices<T> where T : class 
    {
        ModelValidationSource<T> Create(T model);
        ModelValidationSource<T> Update(T model);
        ModelValidationSource<T> Revert(T model);
        
    }
}