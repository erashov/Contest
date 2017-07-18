using System.Collections.Generic;

namespace TestStaff.Dal.Entities
{
    public class Employee
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public virtual ICollection<EmployeeGroup> EmployeeGroups { get; set; }

        public virtual ICollection<Question> Questions { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        public Employee()
        {
            EmployeeGroups = new List<EmployeeGroup>();
            Questions = new List<Question>();
            Answers = new List<Answer>();
        }
    }
}
