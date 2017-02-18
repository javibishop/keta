namespace Keta.Web
{
    using Hangfire;
    using System.Configuration;

    public class App : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            new AppHost().Init();
        }

    }
}