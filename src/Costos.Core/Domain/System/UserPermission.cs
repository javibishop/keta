using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("UserPermissions")]
    public class UserPermission
    {
        [AutoIncrement]
        public byte Id { get; set; }

        [References(typeof(User))]
        public int UserId { get; set; }

        [References(typeof(Permission))]
        public int PermissionId { get; set; }
    }
}