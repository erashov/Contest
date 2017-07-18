using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContestsClients.Front.Models
{
    public class AnswerView
    {
        public int QuestionId { get; set; }

        public string Email { get; set; }

        public List<AnswerModel> Answers{ get; set; }
    }
}