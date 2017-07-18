using System.Collections.Generic;

namespace TestStaff.Dal.Entities
{
    public class EmployeeGroup
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public EmployeeGroup()
        {
            Employees = new List<Employee>();
        }
    }
}
