using ContestsClients.Admin.Models;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace ContestsClients.Admin.Controllers
{
    public class ClientGroupController : ApiController
    {
        private readonly IClientGroupRepository _clientGroupRepository;
        public ClientGroupController(IClientGroupRepository clientGroupRepository)
        {
            _clientGroupRepository = clientGroupRepository;
        }

        public PagingModel<ClientGroup> Get(int page, int count)
        {
            return new PagingModel<ClientGroup>
            {
                Records = _clientGroupRepository.FindPage(page, count),
                Count = _clientGroupRepository.Find().Count()
            };
        }

        public ClientGroup Get(int id)
        {
            return _clientGroupRepository.FindById(id);
        }

        public ClientGroup Post(ClientGroup group)
        {
            return _clientGroupRepository.Add(group);
        }

        public ClientGroup Put(ClientGroup group)
        {
            return _clientGroupRepository.Update(group);
        }

        public ClientGroup Delete(ClientGroup group)
        {
            return _clientGroupRepository.Remove(group);
        }
    }
}
