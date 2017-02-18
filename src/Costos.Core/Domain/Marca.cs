using ServiceStack.DataAnnotations;
using System;

namespace Keta.Domain
{
    [Alias("Marcas")]
    public class Marca
    {
        [AutoIncrement]
        public byte Id { get; set; }

        public string Codigo { get; set; }

        public string Descripcion { get; set; }

        public int UsuarioId { get; set; }
        public DateTime FechaModificacion{ get; set; }
    }
}