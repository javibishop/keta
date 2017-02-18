using ServiceStack.DataAnnotations;
using System;

namespace Keta.Domain.System
{
    [Alias("Log")]
    public class Log
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Message { get; set; }

        public DateTime Date { get; set; }
    }
}