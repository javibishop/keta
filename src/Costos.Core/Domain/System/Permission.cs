using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("Permissions")]
    public class Permission
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}