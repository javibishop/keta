using System;
using ServiceStack;

namespace Keta.ServiceModel.System
{
    public class Role
    {
        [Route("/system/role/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

   

        //[Route("/system/roles")]
        //public class Find
        //{
        //    public int? Skip { get; set; }
        //    public int? Take { get; set; }
        //    public string Name { get; set; }
        //}

        

        [Route("/system/role", "POST")]
        public class Post : Keta.Domain.System.Role
        {
        }

        [Route("/system/role/{Id}", "PUT")]
        public class Put : Keta.Domain.System.Role
        {
        }

        public class QueryResult
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string TenantName { get; set; }
        }
    }
}
