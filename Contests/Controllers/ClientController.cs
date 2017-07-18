using ContestsClients.Admin.Models;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace ContestsClients.Admin.Controllers
{

    public class ClientController : ApiController
    {
        private IClientRepository _clientRepository;
        public ClientController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }
        public PagingModel<Client> Get(int page, int count, int? groupId = null)
        {
            if (groupId == null)
            {
                return new PagingModel<Client>
                {
                    Records = _clientRepository.FindPage(page, count),
                    Count = _clientRepository.Find().Count()
                };
            }

            return new PagingModel<Client>
            {
                Records = _clientRepository.FindPage(page, count, groupId.Value),
                Count = _clientRepository.Find(groupId.Value).Count()
            };
        }

        public Client Get(int id)
        {
            return _clientRepository.FindById(id);
        }

        public Client Post(Client contest)
        {
            return _clientRepository.Add(contest);
        }

        public Client Put(Client contest)
        {

            return _clientRepository.Update(contest);
        }

        public Client Delete(Client contest)
        {
            return _clientRepository.Remove(contest);
        }
    }
}
