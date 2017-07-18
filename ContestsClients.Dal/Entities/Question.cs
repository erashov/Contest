using System.Collections.Generic;

namespace ContestsClients.Dal.Entities
{

    public class Question
    {
        public int? Id { get; set; }

        public string Text { get; set; }

        public int ContestId { get; set; }

        public int QuestionTypeId { get; set; }

        public virtual Contest Contest { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        public virtual QuestionType QuestionType { get; set; }

        public virtual ICollection<Client> Clients { get; set; }


        public Question()
        {
            Answers = new List<Answer>();
            Clients = new List<Client>();
        }
       
    }
}
