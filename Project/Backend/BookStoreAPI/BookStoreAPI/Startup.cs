using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using Swashbuckle.AspNetCore.Swagger;

namespace BookStoreAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.Configure<StripeSettings>(Configuration.GetSection("Stripe"));
            services.Configure<PayPalSettings>(Configuration.GetSection("PayPal"));

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc().AddJsonOptions(
                options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddMvc().AddSessionStateTempDataProvider();
            services.AddSession(options =>
            {
                options.IdleTimeout =
                    TimeSpan.FromHours(int.Parse(Configuration.GetSection("ExpireTime").Value.ToString()));
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            services.AddDistributedMemoryCache();

            var xmlPath = System.AppDomain.CurrentDomain.BaseDirectory + @"BookStoreAPI.xml";
            services.AddSwaggerGen(s =>
            {
                s.DescribeAllEnumsAsStrings();
                s.DescribeAllParametersInCamelCase();
                s.SwaggerDoc("v1", new Info { Title = "Book Store API", Version = "v1" });
                s.IncludeXmlComments(xmlPath);
                s.AddSecurityDefinition("Bearer",
                    new ApiKeyScheme
                    {
                        In = "header",
                        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                        Name = "Authorization",
                        Type = "apiKey"
                    });
                s.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                    { "Bearer", Enumerable.Empty<string>() },
                });
            });

            services.AddCors(option => option.AddPolicy("BookStoreAPIPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

            }));

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("BookStoreAPIPolicy"));
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    //var signingKey = Convert.FromBase64String(Configuration["JwtSigningSecret"]);
                    string securityKey = SettingHelper.GetConfig().GetSection("JwtSigningSecret").Value;
                    var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        ValidIssuer = "books.sell",
                        ValidAudience = "readers",
                        IssuerSigningKey = symmetricSecurityKey,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            var connection = Configuration.GetSection("ConnectionString").Value;
            services.AddDbContext<BookStoreContext>(options => options.UseSqlServer(connection));
            SettingHelper.ConnectionString = connection;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseSession();
            app.UseMvc();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseSwagger();
            app.UseSwaggerUI(s =>
            {
                s.SwaggerEndpoint("/swagger/v1/swagger.json", "Core API");
                s.RoutePrefix = string.Empty;
                s.EnableFilter();
            });
            app.UseCors("BookStoreAPIPolicy");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Files")),
                RequestPath = "/Files"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "QR")),
                RequestPath = "/QR"
            });

            StripeConfiguration.SetApiKey(Configuration.GetSection("Stripe")["SecretKey"]);
            PayPalSettings.ClientId = Configuration.GetSection("PayPal")["ClientId"];
            PayPalSettings.Secret = Configuration.GetSection("PayPal")["Secret"];
        }
    }
}
