using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Owin;


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
            services.AddMvc();


            // Application wide configuration
            services.AddInstance(typeof(IConfiguration), Configuration);

           

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

            app.UseSignalR();

            app.UseMvc();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
