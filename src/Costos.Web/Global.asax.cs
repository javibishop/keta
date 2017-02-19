namespace Keta.Web
{
    public class App : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            new AppHost().Init();
        }

    }
}