using System.Collections.Generic;

namespace TestStaff.Dal.Entities
{
    public class Answer
    {
        public int? Id { get; set; }

        public string Text { get; set; }

        public int QuestionId { get; set; }


        public int? Rating { get; set; }

        public virtual Question Question { get; set; }

       // public virtual AnswerType AnswerType { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }

        public Answer()
        {
            Employees = new List<Employee>();
        }
    }
}
