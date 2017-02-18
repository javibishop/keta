using System;
using System.Configuration;
using System.Web;
using Keta.Web.Infraestructure;
using Keta.Web.ServiceInterface.System;
using Funq;
using ServiceStack;
using ServiceStack.Api.Swagger;
using ServiceStack.Auth;
using ServiceStack.Caching;
using ServiceStack.Data;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.SqlServer;
using ServiceStack.Redis;
using ServiceStack.Text;
using Telerik.Reporting.Services;
using Telerik.Reporting.Services.ServiceStack;
using Hangfire;
using Hangfire.Dashboard;

namespace Keta.Web
{
    public class AppHost : AppHostBase
    {
        private BackgroundJobServer _backgroundJobServer;
        //Tell Service Stack the name of your application and where to find your web services
        public AppHost() : base("Keta Api", typeof(UserServices).Assembly, typeof(ReportsHostBase).Assembly)
        {
            
        }

        public override void Configure(Container container)
        {
            JsConfig.ConvertObjectTypesIntoStringDictionary = true;
            //Set JSON web services to return idiomatic JSON camelCase properties
            JsConfig.EmitCamelCaseNames = true;
            JsConfig.DateHandler = DateHandler.ISO8601;
            JsConfig.AlwaysUseUtc = true;
            JsConfig.TryToParsePrimitiveTypeValues = true;
            JsConfig.IncludeNullValues = true;
            //this.Config.AddRedirectParamsToQueryString = true;
            //this.Config.ApiVersion = "v1";
            this.Config.HandlerFactoryPath = "api";
            SqlServerOrmLiteDialectProvider.Instance.GetDateTimeConverter().DateStyle = DateTimeKind.Utc;
            OrmLiteConfig.CommandTimeout = 1000;
            var factory = new OrmLiteConnectionFactory(ConfigurationManager.ConnectionStrings["Costos"].ConnectionString, SqlServerOrmLiteDialectProvider.Instance)
            {
                DialectProvider = { StringSerializer = new JsonStringSerializer() }
            };
            
            container.Register<IDbConnectionFactory>(factory);

            var cacheManagerSetting = ConfigurationManager.AppSettings["CacheManager"];
            if (cacheManagerSetting.ToLowerInvariant() == "redis")
            {
                var redisClientManager = new PooledRedisClientManager(3, "localhost:6379");
                container.Register<IRedisClientsManager>(c => redisClientManager);
                container.Register(c => c.Resolve<IRedisClientsManager>().GetCacheClient()).ReusedWithin(Funq.ReuseScope.None);
            }
            else
            {
                container.Register<ICacheClient>(new MemoryCacheClient());
            }


            container.Register<ISessionFactory>(c => new SessionFactory(c.Resolve<ICacheClient>()));
            container.Register<HttpContextBase>(x => new HttpContextWrapper(HttpContext.Current)).ReusedWithin(ReuseScope.None);

            this.Plugins.Add(new AutoQueryFeature { MaxLimit = 100 });
            this.Plugins.Add(new SwaggerFeature
            {
                UseBootstrapTheme = true,
                LogoUrl = "/content/img/logo-big.png" //optional use your own logo
            });

            this.Plugins.Add(new RequestLogsFeature());
            this.ConfigureAuth(container);


            //// Telerik Reporting
            //var reportsPath = System.Web.HttpContext.Current.Server.MapPath(@"~\Reports");
            //var resolver = new Telerik.Reporting.Services.ServiceStack.ReportFileResolver(reportsPath).AddFallbackResolver(new Telerik.Reporting.Services.ServiceStack.ReportTypeResolver());

            //var reportServiceConfiguration = new Telerik.Reporting.Services.ReportServiceConfiguration
            //{
            //    HostAppId = "Costos",
            //    ReportResolver = resolver,
            //    Storage = new Telerik.Reporting.Cache.File.FileStorage()
            //};
            //container.Register<IReportServiceConfiguration>(reportServiceConfiguration);

            //GlobalConfiguration.Configuration.UseSqlServerStorage(ConfigurationManager.ConnectionStrings["Costos"].ConnectionString);
            //app.UseHangfireDashboard();
            //app.UseHangfireServer();

             //_backgroundJobServer = new BackgroundJobServer();

        }

        private void ConfigureAuth(Funq.Container container)
        {
            LogManager.LogFactory = new ConsoleLogFactory();
            container.Register<IUserAuthRepository>(c => new UserAuthRepository(c.Resolve<IDbConnectionFactory>()));

            //Register all Authentication methods you want to enable for this web app.            
            this.Plugins.Add(new AuthFeature(
                () => new Session(), //Use your own typed Custom UserSession type
                new IAuthProvider[] {
                    new CredentialsAuthProvider()       //HTML Form post of UserName/Password credentials
                    //new TwitterAuthProvider(appSettings),  //Sign-in with Twitter
                    //new FacebookAuthProvider(appSettings), //Sign-in with Facebook
                    //new BasicAuthProvider()               //Sign-in with Basic Auth
                }));

            //Provide service for new users to register so they can login with supplied credentials.
            //Plugins.Add(new RegistrationFeature());

            //override the default registration validation with your own custom implementation
            //container.RegisterAs<CustomRegistrationValidator, IValidator<Registration>>();
        }
    }
}
