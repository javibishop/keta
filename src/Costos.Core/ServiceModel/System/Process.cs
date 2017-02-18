using Keta.Infraestructure;
using ServiceStack;
using System;
using System.Collections.Generic;

namespace Keta.ServiceModel.System
{
    public class Process
    {
        [Route( "/system/process/{Id}", "GET")]
        public class Get
        {
            public int Id { get; set; }
        }

        [Route("/system/process", "POST")]
        [Route("/system/process/{Id}", "PUT")]
        public class Post : Domain.System.ProcessHistory
        {
        }
        [Route("/system/process", "GET")]
        public class Query : QueryBase<Domain.System.ProcessHistory, QueryProcessResult>
        {
        }
    }

    public class QueryProcessResult
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PeriodName { get; set; }
        public DateTime Date { get; set; }
        public string Status{ get; set; }
    }
}
