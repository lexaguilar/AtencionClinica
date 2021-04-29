using AtencionClinica.Models;
using Microsoft.Extensions.DependencyInjection;

namespace AtencionClinica.Services
{
    static class AuthUserServiceCollectionExtensions
    {
        public static void AddInPutProductServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<InPutProduct>, InPutProductServices>();
        }
        public static void AddOutPutProductServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<OutPutProduct>, OutPutProductServices>();
        }

        public static void AddTraslateServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<Traslate>, TraslateServices>();
        }

        public static void AddWorkOrderServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<WorkOrder>, WorkOrderServices>();
        }

        public static void AddPrivateWorkOrderServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<PrivateWorkOrder>, PrivateWorkOrderServices>();
        }

        public static void AddBillServices(this IServiceCollection services)
        {

            services.AddScoped<IProductServices<Bill>, BillServices>();
        }
    }
}