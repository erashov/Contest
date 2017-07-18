using ContestsClients.Dal.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace ContestsClients.Dal.Concrete
{
    public class EfReportingRepository : IReportingRepository
    {
        public DataTable GetReport(int ContestId)
        {
            using (SqlConnection sqlcon = new SqlConnection(ConfigurationManager.ConnectionStrings["Contests_DB"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("ReportContest", sqlcon))
                {
                    cmd.Parameters.AddWithValue("@ContestId", ContestId);
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
