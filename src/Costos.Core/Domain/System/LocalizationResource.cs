using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("LocalizationResources")]
    public class LocalizationResource
    {
        [AutoIncrement]
        public int Id { get; set; }

        public byte LanguageId { get; set; }

        public string Name { get; set; }

        public string Value { get; set; }
    }
}