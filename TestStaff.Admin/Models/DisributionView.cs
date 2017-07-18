using TestStaff.Dal.Entities;
using System.Collections.Generic;

namespace TestStaff.Admin.Models
{
    public class DisributionView
    {
        public int TestId { get; set; }
        public string Text { get; set; }
        public string Subject { get; set; }
        public List<EmployeeGroup> SelectGroups { get; set; }
    }
}