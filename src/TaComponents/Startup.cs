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
using TaComponents.Repositories.Mongo;


namespace TaComponents
{
    using Microsoft.AspNet.StaticFiles;

    public class Startup
    {
        private const string ConfigurationPrefix = "TaComponents";

        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            /* 
                when not in development obtain some settings from the environment, 
                e.g. "TaComponents:Data:Mongo:App:ConnectionString"
            */
            if (!env.IsDevelopment())
            {
                builder.AddEnvironmentVariables(prefix: ConfigurationPrefix);
            }

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

            services.AddTransient<IUserContext, UserContext>();

            services.AddTransient<IRepository<ComponentProduct>, MongoRepository<ComponentProduct>>();

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
