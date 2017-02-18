using ServiceStack.DataAnnotations;
using System;

namespace Keta.Domain.System
{
    [Alias("ProcessHistory")]
    public class ProcessHistory
    {
        public enum ProcessHistoryState { Iniciado, Procesado, Fallido };

        [AutoIncrement]
        public int Id { get; set; }

        public int PeriodId { get; set; }

        public int CompanyId { get; set; }

        public int UserId { get; set; }

        public string Name { get; set; }

        public string JobId { get; set; }

        public string State { get; set; }

        public string Message { get; set; }

        public DateTime Date { get; set; }
    }
}