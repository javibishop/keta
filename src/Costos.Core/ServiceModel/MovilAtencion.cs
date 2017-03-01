

using Keta.Infraestructure;
using ServiceStack;
using System;
using System.Collections.Generic;

namespace Keta.ServiceModel
{
    public class MovilAtencion
    {
        [Route("/servicios/movilatenciones/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/servicios/movilatenciones", "POST")]
        [Route("/servicios/movilatenciones/{Id}", "PUT")]
        public class Post : Domain.MovilAtencion
        {
        }
        [Route("/servicios/movilatenciones", "GET")]
        public class Query : QueryBase<Domain.MovilAtencion, QueryResultMA>
             , IJoin<Domain.MovilAtencion, Domain.Cliente>
             , IJoin<Domain.MovilAtencion, Domain.Marca>
        {
        }
        
        [Route("/servicios/movilatenciones/lookup", "GET")]
        public class Lookup : LookupRequest, IReturn<List<LookupItem>>
        {
        }

          [Route("/servicios/movilatenciones/delete/{Id}", "POST")]
        public class DeleteMovilAtencion
        {
            public int Id { get; set; }
        }
        public class QueryResultMA
        {
            public int Id { get; set; }
            public string Patente { get; set; }
            public string ClienteNombre { get; set; }
            public string ClienteApellido { get; set; }
            public string ClienteTelefono { get; set; }
            public string MarcaCodigo { get; set; }
            public string Modelo { get; set; }
            public DateTime Fecha { get; set; }
        }
    }
}
