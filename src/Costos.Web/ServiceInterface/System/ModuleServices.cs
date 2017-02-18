using System;
using System.Linq;
using Keta.Infraestructure;
using ServiceStack;
using ServiceStack.OrmLite;

namespace Keta.Web.ServiceInterface.System
{
    [Authenticate]
    public class ModuleServices : Service
    {
        public IAutoQuery AutoQuery { get; set; }

        public class CostDriverTypeServices : ApplicationService
        {
            public IAutoQuery AutoQuery { get; set; }
            public object Put(Keta.ServiceModel.System.Module.Post request)
            {
                return Db.Update((Domain.System.Module)request);
            }

            public object Post(Keta.ServiceModel.System.Module.Post request)
            {
                request.Id = (byte)Db.Insert((Domain.System.Module)request, true);
                return request;
            }

            public object Get(Keta.ServiceModel.System.Module.Get request)
            {
                var model = Db.SingleById<Domain.System.Module>(request.Id);
                return model;
            }

            public QueryResponse<Keta.ServiceModel.System.QueryResult> Get(Keta.ServiceModel.System.Module.Query request)
            {
                if (request.OrderByDesc == null)
                {
                    request.OrderByDesc = "Id";
                }

                var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
                return AutoQuery.Execute(request, q);
            }

            public LookupResult Get(Keta.ServiceModel.System.Module.Lookup request)
            {
                var query = Db.From<Domain.System.Module>().Select(x => new { x.Id, x.Name });

                if (!string.IsNullOrEmpty(request.Q))
                {
                    query = query.Where(q => q.Name.Contains(request.Q) || q.Name.Contains(request.Q));
                }

                var count = Db.Count(query);

                //query = query.OrderByDescending(q => q.Id)
                //    .Limit(request.Page.GetValueOrDefault(0), request.PageSize.GetValueOrDefault(10) * request.Page.GetValueOrDefault(1));

                query = query.OrderByDescending(q => q.Id)
                   .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));


                var result = new LookupResult
                {
                    Data = Db.Select(query).Select(x => new LookupItem { Id = x.Id, Text = x.Name }),
                    Total = (int)count
                };
                return result;
            }
        }
    }
}
