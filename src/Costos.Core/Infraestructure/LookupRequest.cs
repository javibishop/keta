namespace Keta.Infraestructure
{
    public class LookupRequest
    {
        public int? Id { get; set; }
        public int? Page { get; set; }
        public int? PageSize { get; set; }
        public string Q { get; set; }

        public LookupRequest()
        {
            Q = string.Empty;
        }
    }
}
