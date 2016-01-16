using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc.Formatters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using TaComponents.Helpers;
using TaComponents.Models;
using TaComponents.Repositories;

namespace TaComponents
{
    using Microsoft.AspNet.SignalR.Transports;
    using Microsoft.AspNet.StaticFiles;

    using TaComponents.Repositories.ActiveDirectory;
    using TaComponents.Repositories.Database;

    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddMvcOptions(o =>
            {
                var jsonOutputFormatter = new JsonOutputFormatter
                {
                    SerializerSettings =
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver(),
                        DefaultValueHandling = Newtonsoft.Json.DefaultValueHandling.Ignore
                    }
                };

                o.OutputFormatters.RemoveType<JsonOutputFormatter>();
                o.OutputFormatters.Insert(0, jsonOutputFormatter);
            });


            // Application wide configuration
            services.AddInstance(typeof(IConfiguration), Configuration);
            services.AddSingleton<IDateContext, DateContext>();

            services.AddTransient<IUserContext, UserContext>();

            if (Configuration.Get<bool>("Fake:UserRepository"))
            {
                services.AddSingleton<IUserRepository, FakeUserRepository>();
            }
            else
            {
                services.AddSingleton<IUserRepository, UserRepository>();
            }

            if (Configuration.Get<bool>("Fake:UserContext"))
            {
                services.AddSingleton<IUserContext, FakeUserContext>();
            }
            else
            {
                services.AddSingleton<IUserContext, UserContext>();
            }
            
            services.AddTransient<IThingRepository, ThingRepository>();
            services.AddTransient<IDataRepository<Status>, StatusRepository>();
            services.AddTransient<IDataRepository<RiskSeverity>, RiskSeverityRepository>();
            services.AddTransient<IDataRepository<RiskProbability>, RiskProbabilityRepository>();
            services.AddTransient<IDataRepository<User>, MongoRepository<User>>();
            
            services.AddTransient<IUserCacheRepository, UserCacheRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            

            app.UseIISPlatformHandler();

            var defaultFilesOptions = new DefaultFilesOptions();

            defaultFilesOptions.DefaultFileNames.Clear();
            defaultFilesOptions.DefaultFileNames.Add("index.html");

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseMvc();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
