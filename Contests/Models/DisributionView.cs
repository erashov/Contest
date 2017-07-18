using ContestsClients.Dal.Entities;
using System.Collections.Generic;

namespace ContestsClients.Admin.Models
{
    public class DisributionView
    {
        public int ContestId { get; set; }
        public string Text { get; set; }
        public string Subject { get; set; }
        public List<ClientGroup> SelectGroups { get; set; }
    }
}