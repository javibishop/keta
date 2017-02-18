using ServiceStack.DataAnnotations;
using System;

namespace Keta.Domain
{
    [Alias("Clientes")]
    public class Cliente
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Comentario { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaModificacion { get; set; }

        [Ignore]
        public string NombreCompleto
        {
            get { return this.Apellido + " " + this.Nombre; }
        }
    }
}