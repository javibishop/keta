using ServiceStack;
using ServiceStack.OrmLite;

namespace Keta.Web.ServiceInterface.System
{
    [Authenticate]
    public class LogServices : ApplicationService
    {
        public IAutoQuery AutoQuery { get; set; }

        //public object Put(Costos.ServiceModel.System.Process.Post request)
        //{
        //    return Db.Update((Domain.System.ProcessHistory)request);
        //}

        //public object Post(Costos.ServiceModel.System.Process.Post request)
        //{
        //    request.Id = (int)Db.Insert((Domain.System.ProcessHistory)request, true);
        //    return request;
        //}

    }
}
