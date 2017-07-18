using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContestsClients.Dal.Entities
{
    public class LogDistribution
    {
        public int? Id { get; set; }

        public string Error { get; set; }

        public string Email { get; set; }

        public DateTime? SendDate { get; set; }

        public virtual Distribution Distribution { get; set; }
    }
}
