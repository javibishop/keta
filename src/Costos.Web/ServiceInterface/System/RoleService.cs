using Keta.ServiceModel.System;
using ServiceStack;
using ServiceStack.OrmLite;

namespace Keta.Web.ServiceInterface.System
{
    [Authenticate]
    public class RoleServices : Service
    {
        public IAutoQuery AutoQuery { get; set; }
        public Domain.System.Role Get(Role.Get request)
        {
            return Db.SingleById<Domain.System.Role>(request.Id).ConvertTo<Domain.System.Role>();
        }

        //public object Get(Role.Get request)
        //{
        //    return Db.SingleById<Domain.System.Role>(request.Id).ConvertTo<Role.QueryResult>();
        //}

        //public QueryResponse<Role.QueryResult> Get(Role.Query request)
        //{
        //   var requestParams = Request.GetRequestParams();
        //    if (request.OrderBy == null && requestParams.ContainsKey("sidx") && string.IsNullOrEmpty(requestParams["sidx"]))
        //    {
        //        request.OrderBy = "Id";
        //    }
        //    else
        //    {
        //        if (requestParams.ContainsKey("sidx") && !string.IsNullOrEmpty(requestParams["sidx"]))
        //        {
        //            var orderProperty = requestParams["sidx"].ToString();
        //            request.OrderBy = orderProperty.ToPascalCase();
        //        }
        //        if (requestParams.ContainsKey("sord") && !string.IsNullOrEmpty(requestParams["sord"]))
        //        {
        //            var orderDirection = requestParams["sord"].ToString();
        //            if (orderDirection == "desc")
        //            {
        //                request.OrderBy = "-" + request.OrderBy;
        //            }
        //        }
        //    }
            
        //    var q = AutoQuery.CreateQuery(request, requestParams);
        //    return AutoQuery.Execute(request, q);
        //}

        //public object Any(Role.Find request)
        //{
        //    var query = Db.From<Domain.System.Role>()
        //        .OrderByDescending(q => q.Id)
        //        .Limit(request.Skip.GetValueOrDefault(0), request.Take.GetValueOrDefault(10));

        //    if (!string.IsNullOrEmpty(request.Name))
        //        query.Where(q => q.Name.Contains(request.Name));

        //    return Db.Select(query);
        //}

        public Domain.System.Role Put(Role.Put request)
        {
            Db.Update((Domain.System.Role)request);
            return request.ConvertTo<Domain.System.Role>();
        }

        public Domain.System.Role Post(Role.Post request)
        {
            request.Id = (byte)Db.Insert((Domain.System.Role)request);
            return request.ConvertTo<Domain.System.Role>();
        }
    }
}
