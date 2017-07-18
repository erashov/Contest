using System.Data;

namespace TestStaff.Dal.Abstract
{
    public interface IReportingRepository
    {
        DataTable GetReport(int ContestId);
    }
}
