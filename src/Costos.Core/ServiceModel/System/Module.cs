

using Keta.Infraestructure;
using ServiceStack;
using System.Collections.Generic;

namespace Keta.ServiceModel.System
{
    public class Module
    {
        [Route("/system/modules/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/system/modules", "POST")]
        [Route("/system/modules/{Id}", "PUT")]
        public class Post : Domain.System.Module
        {
        }
        [Route("/system/modules", "GET")]
        public class Query : QueryBase<Domain.System.Module, QueryResult>
        {
        }

        [Route("/system/modules/lookup", "GET")]
        public class Lookup : LookupRequest, IReturn<List<LookupItem>>
        {
        }
    }

    public class QueryResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte ListIndex { get; set; }
    }
}
