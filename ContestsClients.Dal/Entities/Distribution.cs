using System;
using System.Collections.Generic;

namespace ContestsClients.Dal.Entities
{
    public class Distribution
    {
        public int? Id { get; set; }
        public string Text { get; set; }
        public int ContestId { get; set; }
        public string Subject { get; set; }
        public DateTime? CreateDate { get; set; }
        public int ManagerId { get; set; }
        public Contest Contest { get; set; }
        public virtual ICollection<LogDistribution> LogDistributions { get; set; }

        public Distribution()
        {
            LogDistributions = new List<LogDistribution>();
        }
    }
}
