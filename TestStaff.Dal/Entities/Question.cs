using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestStaff.Dal.Entities
{

    public class Question
    {
        public int? Id { get; set; }

        public string Text { get; set; }

        public int TestId { get; set; }


        public virtual Test Test { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        [NotMapped]
        public bool? HasManyCorrectAnswer { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }


        public Question()
        {
            Answers = new List<Answer>();
            Employees = new List<Employee>();
        }
       
    }
}
