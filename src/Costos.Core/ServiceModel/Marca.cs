

using Keta.Infraestructure;
using ServiceStack;
using System.Collections.Generic;

namespace Keta.ServiceModel
{
    public class Marca
    {
        [Route("/servicios/marcas/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/servicios/marcas", "POST")]
        [Route("/servicios/marcas/{Id}", "PUT")]
        public class Post : Domain.Marca
        {
        }
        [Route("/servicios/marcas", "GET")]
        public class Query : QueryBase<Domain.Marca, Domain.Marca>
        {
        }

        [Route("/servicios/marcas/lookup", "GET")]
        public class Lookup : LookupRequest, IReturn<List<LookupItem>>
        {
        }

        public class QueryResult
        {
            public int Id { get; set; }
            public string Codigo { get; set; }
            public string Descripcion { get; set; }
            public int DuracionMes { get; set; }
        }
    }
}
