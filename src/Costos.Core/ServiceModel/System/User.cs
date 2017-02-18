using System;
using ServiceStack;
using Keta.Infraestructure;
using System.Collections.Generic;

namespace Keta.ServiceModel.System
{
    public class User
    {
        [Route("/system/users/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/system/users")]
        public class Find : QueryBase<Domain.System.User, QueryResult>
        {
        }

        
        [Route("/system/users/lookup", "GET")]
        public class Lookup : LookupRequest, IReturn<List<LookupItem>>
        {
        }

         
        [Route("/system/users/procurador/lookup", "GET")]
        public class LookupProcurador : LookupRequest, IReturn<List<LookupItem>>
        {
            public bool Admin { get; set; }
        }

        
        [Route("/system/users", "POST")]
        [Route("/system/users/{Id}", "PUT")]
        public class Post : Domain.System.User
        {
        }

        public class QueryResult
        {
            public int Id { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }

            public string UserName { get; set; }

            public string Email { get; set; }

            public string State { get; set; }

            public DateTime StateDate { get; set; }

            public int ParentId { get; set; }

            public int TenantId { get; set; }
        }
    }
}
