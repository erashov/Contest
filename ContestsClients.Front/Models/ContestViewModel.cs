using ContestsClients.Dal.Entities;

namespace ContestsClients.Front.Models
{
    public class ContestViewModel
    {
        public Contest Contest { get; set; }

        public Client Client { get; set; }

        public Question LastQuestion { get; set; }
    }
}