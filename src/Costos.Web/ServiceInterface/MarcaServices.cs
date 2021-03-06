﻿using System.Linq;
using Keta.Infraestructure;
using ServiceStack;
using ServiceStack.OrmLite;
using Keta.Web.ServiceInterface;
using System;

namespace Keta.Web.ServiceInterface
{
    [Authenticate]
    public class MarcaServices : ApplicationService
    {
        public IAutoQuery AutoQuery { get; set; }

        public object Put(ServiceModel.Marca.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            return Db.Update((Domain.Marca)request);
        }

        public object Post(ServiceModel.Marca.Post request)
        {
            request.UsuarioId = this.Session.UserId;
            request.FechaModificacion = DateTime.Now;
            request.Id = (byte)Db.Insert((Domain.Marca)request, true);
            return request;
        }
        public object Post(ServiceModel.Marca.DeleteMarca request)
        {
            var autos = Db.Select<Domain.MovilAtencion>(m=> m.MarcaId == request.Id);
            if (autos.Count == 0)
            {
                Db.DeleteById<Domain.MovilAtencion>(request.Id);
                return new { result = true };
            }
            else
            {
                return new { result = false };
            }
        }

        public object Get(ServiceModel.Marca.Get request)
        {
            var model = Db.SingleById<Domain.Marca>(request.Id);
            return model;
        }

        public QueryResponse<Domain.Marca> Get(ServiceModel.Marca.Query request)
        {
            if (request.OrderByDesc == null)
            {
                request.OrderByDesc = "Id";
            }

            var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
            return AutoQuery.Execute(request, q);
        }

        public LookupResult Get(ServiceModel.Marca.Lookup request)
        {
            var query = Db.From<Domain.Marca>().Select(x => new { x.Id, x.Codigo });

            if (!string.IsNullOrEmpty(request.Q))
            {
                query = query.Where(q => q.Codigo.Contains(request.Q) || q.Codigo.Contains(request.Q));
            }

            var count = Db.Count(query);

            //query = query.OrderByDescending(q => q.Id)
            //    .Limit(request.Page.GetValueOrDefault(0), request.PageSize.GetValueOrDefault(10) * request.Page.GetValueOrDefault(1));

            query = query.OrderByDescending(q => q.Id)
               .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));


            var result = new LookupResult
            {
                Data = Db.Select(query).Select(x => new LookupItem { Id = x.Id, Text = x.Codigo }),
                Total = (int)count
            };
            return result;
        }
    }
}

