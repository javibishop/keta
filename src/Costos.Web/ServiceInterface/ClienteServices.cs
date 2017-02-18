using System.Linq;
using Keta.Infraestructure;
using ServiceStack;
using ServiceStack.OrmLite;
using Keta.Web.ServiceInterface;
using System;

namespace Keta.Web.ServiceInterface
{
    [Authenticate]
    public class ClienteServices : ApplicationService
    {
        public IAutoQuery AutoQuery { get; set; }

        public object Put(ServiceModel.Cliente.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            return Db.Update((Domain.Cliente)request);
        }

        public object Post(ServiceModel.Cliente.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            request.Id = (byte)Db.Insert((Domain.Cliente)request, true);
            return request;
        }

        public object Get(ServiceModel.Cliente.Get request)
        {
            var model = Db.SingleById<Domain.Cliente>(request.Id);
            return model;
        }

        public QueryResponse<Domain.Cliente> Get(ServiceModel.Cliente.Query request)
        {
            if (request.OrderByDesc == null)
            {
                request.OrderByDesc = "Id";
            }

            var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
            return AutoQuery.Execute(request, q);
        }

        public LookupResult Get(ServiceModel.Cliente.Lookup request)
        {
            var query = Db.From<Domain.Cliente>().Select(x => new { x.Id, x.Nombre, x.Apellido });

            if (!string.IsNullOrEmpty(request.Q))
            {
                query = query.Where(q => q.Nombre.Contains(request.Q) || q.Apellido.Contains(request.Q));
            }

            var count = Db.Count(query);

            //query = query.OrderByDescending(q => q.Id)
            //    .Limit(request.Page.GetValueOrDefault(0), request.PageSize.GetValueOrDefault(10) * request.Page.GetValueOrDefault(1));

            query = query.OrderByDescending(q => q.Id)
               .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));


            var result = new LookupResult
            {
                Data = Db.Select(query).Select(x => new LookupItem { Id = x.Id, Text = x.Apellido+ " " + x.Nombre }),
                Total = (int)count
            };
            return result;
        }
    }
}

