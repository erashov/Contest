using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContestsClients.Dal.Abstract
{
   public interface IReportingRepository
    {
        DataTable GetReport(int ContestId);
    }
}
