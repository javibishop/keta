using Keta.Web.Infraestructure;
using ServiceStack;
using System.Collections.Generic;

namespace Keta.Web.ServiceInterface
{
    public class ApplicationService : Service
    {
        public ApplicationService()
        {
            Messages = new List<string>();
        }
        public Session Session
        {
            get { return SessionAs<Session>(); }
        }

        public List<string> Messages { get; }
    }
}
