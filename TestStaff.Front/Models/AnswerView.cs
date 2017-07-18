using System.Collections.Generic;

namespace TestStaff.Front.Models
{
    public class AnswerView
    {
        public int QuestionId { get; set; }

        public string Email { get; set; }

        public List<AnswerModel> Answers{ get; set; }
    }
}