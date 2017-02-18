using ServiceStack;

namespace Keta.ServiceModel.System
{
    public class Session
    {
        [Route("/sessions/mysession")]
        public class GetMySession
        {
        }

        [Route("/sessions/logout")]
        public class LogOut
        {
        }
    }
}
