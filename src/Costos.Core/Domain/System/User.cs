using System;
using ServiceStack.DataAnnotations;

namespace Keta.Domain.System
{
    [Alias("Users")]
    public class User
    {
        [AutoIncrement]
        public int Id { get; set; }

        public int? ParentId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string State { get; set; }

        public DateTime StateDate { get; set; }

        public bool Admin { get; set; }

        public User()
        {
            State = "NOVALIDATED";
            StateDate = DateTime.Now;
        }
    }
}