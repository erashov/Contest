using TestStaff.Dal.Abstract;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace TestStaff.Dal.Concrete
{
    public class EfReportingRepository : IReportingRepository
    {
        public DataTable GetReport(int TestId)
        {
            using (SqlConnection sqlcon = new SqlConnection(ConfigurationManager.ConnectionStrings["TestStaff_DB"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("TestRepotById", sqlcon))
                {
                    cmd.Parameters.AddWithValue("@Id", TestId);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {
                        DataTable dt = new DataTable();

                        da.Fill(dt);
                        return dt;
                    }
                }
            }
        }
    }
}
