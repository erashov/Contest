using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestStaff.Dal.Entities
{

    public class EmployeeAnswerAdditional
    {
        [Key, Column(Order = 0)]
        public int EmployeeId { get; set; }

        [Key, Column(Order = 1)]
        public int AnswerId { get; set; }

        public string Text { get; set; }


    }
}
