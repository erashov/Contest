using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Contests.Models
{
    public class AnswerView
    {
        public int QuestionId { get; set; }
        public int AnswerId { get; set; }
        public string Email { get; set; }
       public List<AnswerWithText> AnswersWithText { get; set; }
        //int questionId, int answerId, string email
    }
    public class AnswerWithText{
        public int Id { get; set; }
        public string Text { get; set; }
    }
}