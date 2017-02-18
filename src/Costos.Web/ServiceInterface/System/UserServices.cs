using Keta.Infraestructure;
using ServiceStack;
using ServiceStack.OrmLite;
using System.Linq;

namespace Keta.Web.ServiceInterface.System
{
    [Authenticate]
    public class UserServices : Service
    {
        public IAutoQuery AutoQuery { get; set; }

        public Domain.System.User Get(ServiceModel.System.User.Get request)
        {
            return Db.SingleById<Domain.System.User>(request.Id);
        }

        private void AgregarPermisos(int userId, bool esAdmin)
        {
            var userPermisos = Db.From<Domain.System.UserPermission>().Where(x => x.UserId == userId);
            var permisos = Db.Select<Domain.System.Permission>();

            Domain.System.UserPermission userPermission = null;

            if (esAdmin)
            {
                foreach (Domain.System.Permission perm in permisos)
                {
                    userPermission = new Domain.System.UserPermission();
                    userPermission.PermissionId = perm.Id;
                    userPermission.UserId = userId;
                    Db.Insert(userPermission);
                }
            }
            else
            {
                foreach (Domain.System.Permission perm in permisos)
                {
                    userPermission = new Domain.System.UserPermission();
                    userPermission.PermissionId = perm.Id;
                    userPermission.UserId = userId;
                    Db.Insert(userPermission);
                }
            }
        }
   

        public object Get(ServiceModel.System.User.Lookup request)
        {
            var query = Db.From<Domain.System.User>().Select(x => new { x.Id, x.UserName });

            if (!string.IsNullOrEmpty(request.Q))
            {
                query = query.Where(q => q.UserName.Contains(request.Q));
            }

            var count = Db.Count(query);

            query = query.OrderByDescending(q => q.Id)
               .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));

            var data = Db.Select(query);

            var result = new LookupResult
            {
                Data = data.Select(x => new LookupItem { Id = x.Id, Text = x.UserName }),
                Total = (int)count
            };
            return result;
        }

        /// <summary>
        /// Solo procuradores, admin = false
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public object Get(ServiceModel.System.User.LookupProcurador request)
        {
            var query = Db.From<Domain.System.User>().Select(x => new { x.Id, x.UserName });
            query = query.Where(q => q.Admin == false);

            if (!string.IsNullOrEmpty(request.Q))
            {
                query = query.And(q => q.UserName.Contains(request.Q));
            }

            var count = Db.Count(query);

            query = query.OrderByDescending(q => q.Id)
               .Limit((request.Page.GetValueOrDefault(1) - 1) * request.PageSize.GetValueOrDefault(100), request.PageSize.GetValueOrDefault(100));

            var data = Db.Select(query);

            var result = new LookupResult
            {
                Data = data.Select(x => new LookupItem { Id = x.Id, Text = x.UserName }),
                Total = (int)count
            };
            return result;
        }


        public object Any(ServiceModel.System.User.Find request)
        {
            var requestParams = Request.GetRequestParams();
            if (request.OrderBy == null && requestParams.ContainsKey("sidx") && string.IsNullOrEmpty(requestParams["sidx"]))
            {
                request.OrderBy = "Id";
            }
            else
            {
                if (requestParams.ContainsKey("sidx") && !string.IsNullOrEmpty(requestParams["sidx"]))
                {
                    var orderProperty = requestParams["sidx"].ToString();
                    request.OrderBy = orderProperty.ToPascalCase();
                }
                if (requestParams.ContainsKey("sord") && !string.IsNullOrEmpty(requestParams["sord"]))
                {
                    var orderDirection = requestParams["sord"].ToString();
                    if (orderDirection == "desc")
                    {
                        request.OrderBy = "-" + request.OrderBy;
                    }
                }
            }
            
            var q = AutoQuery.CreateQuery(request, requestParams);
            return AutoQuery.Execute(request, q);
        }

        public Domain.System.User Put(ServiceModel.System.User.Post request)
        {
            var current = Db.SingleById<Domain.System.User>(request.Id);
            current.PopulateWith(request);
            Db.Save(current);
            return current;
        }

        public Domain.System.User Post(ServiceModel.System.User.Post request)
        {
            var userExists = Db.Exists<Domain.System.User>(w => w.Email == request.Email);
            if (!userExists)
            {
                request.Id = (int)Db.Insert((Domain.System.User)request, true);
                this.AgregarPermisos(request.Id, request.Admin);
                return request;
            }
            else
            {
                throw new ServiceResponseException("Email");
            }
        }
    }
}
