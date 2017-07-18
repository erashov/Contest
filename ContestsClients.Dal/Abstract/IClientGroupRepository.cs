using ContestsClients.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContestsClients.Dal.Abstract
{
    public interface IClientGroupRepository:IBaseRepository<ClientGroup>
    {
        void AddClientGroup(Client client, ClientGroup group);
    }
}
