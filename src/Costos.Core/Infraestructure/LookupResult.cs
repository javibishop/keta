using System.Collections.Generic;

namespace Keta.Infraestructure
{
    public class LookupResult
    {
        public IEnumerable<LookupItem> Data { get; set; }

        public int Total { get; set; }
    }
}