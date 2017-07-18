using TestStaff.Dal.Entities;

namespace TestStaff.Front.Models
{
    public class TestViewModel
    {
        public Test Test { get; set; }

        public Employee Employee { get; set; }

        public Question LastQuestion { get; set; }
    }
}