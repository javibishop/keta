using Keta.ServiceModel.System;

namespace Keta.Web.ServiceInterface.System
{
    public class SessionServices : ApplicationService
    {
        public object Get(Session.GetMySession request)
        {
            return this.Session;
        }
    }
}
