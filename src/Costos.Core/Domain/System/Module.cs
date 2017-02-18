using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("Modules")]
    public class Module
    {
        [AutoIncrement]
        public byte Id { get; set; }

        public string Name { get; set; }

        public byte ListIndex { get; set; }
    }
}