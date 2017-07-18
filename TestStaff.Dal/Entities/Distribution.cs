using System;
using System.Collections.Generic;

namespace TestStaff.Dal.Entities
{
    public class Distribution
    {
        public int? Id { get; set; }
        public string Text { get; set; }
        public int TestId { get; set; }
        public string Subject { get; set; }
        public DateTime? CreateDate { get; set; }
        public int ManagerId { get; set; }
        public Test Test { get; set; }
        public virtual ICollection<LogDistribution> LogDistributions { get; set; }

        public Distribution()
        {
            LogDistributions = new List<LogDistribution>();
        }
    }
}
