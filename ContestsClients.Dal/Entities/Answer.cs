using System.Collections.Generic;

namespace ContestsClients.Dal.Entities
{
    public class Answer
    {
        public int? Id { get; set; }

        public string Text { get; set; }

        public int QuestionId { get; set; }

        public int AnswerTypeId { get; set; }

        public virtual Question Question { get; set; }

        public virtual AnswerType AnswerType { get; set; }

        public virtual ICollection<Client> Clients { get; set; }

        public Answer()
        {
            Clients = new List<Client>();
        }
    }
}
