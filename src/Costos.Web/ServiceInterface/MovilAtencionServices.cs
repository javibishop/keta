using System.Linq;
using Keta.Infraestructure;
using ServiceStack;
using ServiceStack.OrmLite;
using Keta.Web.ServiceInterface;
using System;

namespace Keta.Web.ServiceInterface
{
    [Authenticate]
    public class MovilAtencionServices : ApplicationService
    {
        public IAutoQuery AutoQuery { get; set; }

        public object Put(ServiceModel.MovilAtencion.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            return Db.Update((Domain.MovilAtencion)request);
        }

        public object Post(ServiceModel.MovilAtencion.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            request.Id = (byte)Db.Insert((Domain.MovilAtencion)request, true);
            return request;
        }

        public object Get(ServiceModel.MovilAtencion.Get request)
        {
            var model = Db.SingleById<Domain.MovilAtencion>(request.Id);
            return model;
        }

        public QueryResponse<Keta.ServiceModel.MovilAtencion.QueryResultMA> Get(ServiceModel.MovilAtencion.Query request)
        {
            if (request.OrderByDesc == null)
            {
                request.OrderByDesc = "Id";
            }

            var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
            return AutoQuery.Execute(request, q);
        }

        public LookupResult Get(ServiceModel.MovilAtencion.Lookup request)
        {
            var query = Db.From<Domain.MovilAtencion>().Select(x => new { x.Id, x.Patente });

            if (!string.IsNullOrEmpty(request.Q))
            {
                query = query.Where(q => q.Patente.Contains(request.Q) || q.Patente.Contains(request.Q));
            }

            var count = Db.Count(query);

            //query = query.OrderByDescending(q => q.Id)
            //    .Limit(request.Page.GetValueOrDefault(0), request.PageSize.GetValueOrDefault(10) * request.Page.GetValueOrDefault(1));

            query = query.OrderByDescending(q => q.Id)
               .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));


            var result = new LookupResult
            {
                Data = Db.Select(query).Select(x => new LookupItem { Id = x.Id, Text = x.Patente }),
                Total = (int)count
            };
            return result;
        }
    }
}

