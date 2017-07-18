using System.Linq;
using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Abstract
{
    public interface IClientRepository:IBaseRepository<Client>
    {
        IQueryable<Client> FindPage(int page, int count, int groupId);
        IQueryable<Client> Find(int groupId);
        Client GetByEmail(string email);
        void AddAnswer(Client client, Answer answer, string text);
        void AddQuestion(Client client, Question question);
    }
}
