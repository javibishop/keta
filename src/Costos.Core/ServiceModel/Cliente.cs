

using Keta.Infraestructure;
using ServiceStack;
using System.Collections.Generic;

namespace Keta.ServiceModel
{
    public class Cliente
    {
        [Route("/servicios/clientes/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/servicios/clientes", "POST")]
        [Route("/servicios/clientes/{Id}", "PUT")]
        public class Post : Domain.Cliente
        {
        }
        [Route("/servicios/clientes", "GET")]
        public class Query : QueryBase<Domain.Cliente, Domain.Cliente>
        {
        }

        [Route("/servicios/clientes/lookup", "GET")]
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
