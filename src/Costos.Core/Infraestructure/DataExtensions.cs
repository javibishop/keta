using System.Data;
using System.Data.SqlClient;

namespace Keta.Infraestructure
{
    public static class DataExtensions
    {
        public static DataTable ExecuteDataTable(this IDbConnection conn, string query)
        {
            var table = new DataTable();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = query;
                using (var da = new SqlDataAdapter(cmd as SqlCommand))
                {
                    da.Fill(table);
                }
            }

            return table;
        }

        public static DataTable ExecuteDataTable(this string query)
        {
            var table = new DataTable();

            using (
                var conn =
                    new System.Data.SqlClient.SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["Costos"].ConnectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = query;
                    using (var da = new SqlDataAdapter(cmd as SqlCommand))
                    {
                        da.Fill(table);
                    }
                }
                conn.Close();
            }

            return table;
        }
    }
}