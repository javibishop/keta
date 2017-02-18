using System;
using System.Collections.Generic;
using System.Linq;
using Keta.Domain.System;
using Keta.ServiceModel.System;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.OrmLite;

namespace Keta.Web.Infraestructure
{
    public class Session : AuthUserSession
    {
        public Session()
        {
            this.Language = "es-ar";
            this.Menu = new List<MenuItem>();
        }

        public int? TenantId { get; set; }

        public List<MenuItem> Menu { get; set; }

        public int UserId
        {
            get
            {
                return string.IsNullOrEmpty(this.UserAuthId) ? 0 : int.Parse(this.UserAuthId);
            }
        }

        public override void OnAuthenticated(IServiceBase authService, IAuthSession session, IAuthTokens tokens, Dictionary<string, string> authInfo)
        {
            var service = authService as ServiceStack.Auth.AuthenticateService;
            var localizationService = service.ResolveService<ServiceInterface.System.LocalizationServices>();
            var typedSession = session as Session;

            if (service == null || service.Db == null || typedSession == null)
            {
                throw new ApplicationException("Error in AuthenticateService");
            }

            var userId = typedSession.UserId;
            var localizationResources = localizationService.Any(new Localization.GetResources { Lang = "en" });
            typedSession.TenantId = 1;

            var roles = service.Db.Select(service.Db.From<Keta.Domain.System.Role>()
                .Join<Keta.Domain.System.Role, UserRole>((r, ur) => r.Id == ur.RoleId)
                .Where<UserRole>(x => x.UserId == userId)
                .And<Keta.Domain.System.Role>(x => x.TenantId == typedSession.TenantId));
            typedSession.Roles.AddRange(roles.Select(x => x.Name));

            var permissions = service.Db.Select(service.Db.From<Permission>()
                .Join<Permission, UserPermission>((p, up) => p.Id == up.PermissionId)
                .Join<UserPermission, Domain.System.User>((up, tu) => up.UserId == tu.Id)
                .Where<Domain.System.User>(x => x.Id == userId));
                //.And<TenantUser>(x => x.TenantId == typedSession.TenantId));
            typedSession.Permissions.AddRange(permissions.Select(x => x.Name));

            var permissionIds = permissions.Select(p => p.Id).ToList();

            var navigationItems = service.Db.Select(service.Db.From<NavigationItem>());

            var menu = navigationItems.Where(x => !x.ParentId.HasValue).OrderBy(x => x.ListIndex)
                .Select(navigationItem => ProcessNavigationItem(navigationItems, navigationItem, permissionIds))
                .Where(menuItem => menuItem != null).ToList();

            typedSession.Menu.AddRange(menu);

            base.OnAuthenticated(authService, session, tokens, authInfo);
        }

        private static MenuItem ProcessNavigationItem(List<NavigationItem> allItems, NavigationItem item, List<int> permissionIds)
        {
            var children = allItems.Where(x => x.ParentId.HasValue && x.ParentId == item.Id).ToList();
            if (item.PermissionId.HasValue && permissionIds.Contains(item.PermissionId.Value) || children.Any())
            {
                var menuItem = new MenuItem
                {
                    Id = item.Id,
                    ListIndex = item.ListIndex,
                    ParentId = item.ParentId,
                    State = item.State,
                    Text = item.Name,
                    IconClass = item.IconClass
                };

                foreach (var child in children.OrderBy(x => x.ListIndex))
                {
                    var childMenuItem = ProcessNavigationItem(allItems, child, permissionIds);
                    if (childMenuItem != null)
                    {
                        menuItem.Items.Add(childMenuItem);
                    }
                }

                return (menuItem.Items.Count > 0 || item.PermissionId.HasValue && permissionIds.Contains(item.PermissionId.Value)) ? menuItem : null;
            }

            return null;
        }

        public class MenuItem
        {
            public MenuItem()
            {
                this.Items = new List<MenuItem>();
            }

            public int Id { get; set; }

            public int? ParentId { get; set; }

            public string Text { get; set; }

            public string State { get; set; }

            public int ListIndex { get; set; }

            public string IconClass { get; set; }

            public List<MenuItem> Items { get; set; }
        }
    }
}
