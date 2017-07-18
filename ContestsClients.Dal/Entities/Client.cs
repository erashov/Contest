using System.Collections.Generic;

namespace ContestsClients.Dal.Entities
{
    public class Client
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public virtual ICollection<ClientGroup> ClientGroups { get; set; }

        public virtual ICollection<Question> Questions { get; set; }

        public virtual ICollection<Answer> Answers { get; set; }

        public Client()
        {
            ClientGroups = new List<ClientGroup>();
            Questions = new List<Question>();
            Answers = new List<Answer>();
        }
    }
}
