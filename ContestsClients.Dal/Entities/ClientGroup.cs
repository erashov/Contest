using System.Collections.Generic;

namespace ContestsClients.Dal.Entities
{
    public class ClientGroup
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Client> Clients { get; set; }
        public ClientGroup()
        {
            Clients = new List<Client>();
        }
    }
}
