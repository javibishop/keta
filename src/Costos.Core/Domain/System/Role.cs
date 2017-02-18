using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("Roles")]
    public class Role
    {
        [AutoIncrement]
        public byte Id { get; set; }

        public int TenantId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}