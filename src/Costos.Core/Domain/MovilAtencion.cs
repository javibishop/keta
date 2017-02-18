using ServiceStack.DataAnnotations;
using System;

namespace Keta.Domain
{
    [Alias("MovilAtenciones")]
    public class MovilAtencion
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string Patente { get; set; }
        public DateTime Fecha { get; set; }
        public int Anio { get; set; }
        public string Modelo { get; set; }

        [References(typeof(Cliente))]
        public int ClienteId { get; set; }
        public string Detalle { get; set; }

        [References(typeof(Marca))]
        public int MarcaId { get; set; }
        public decimal CostoRepuestos { get; set; }
        public decimal CostoTotal { get; set; }

        public int UsuarioId { get; set; }
        public DateTime FechaModificacion{ get; set; }
    }
}