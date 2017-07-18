using System.Data.Entity;
using System.Linq;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Concrete
{
    public class EfClientRepository : IClientRepository
    {
        private readonly EfContestsClientsDbContext _context;

        public EfClientRepository(EfContestsClientsDbContext context)
        {
            _context = context;
        }

        public Client GetByEmail(string email)
        {
            return _context.Clients.FirstOrDefault(i => i.Email == email);
        }



        public void AddAnswer(Client client, Answer answer, string text)
        {
            client.Answers.Add(answer);
            _context.Entry(answer).State = EntityState.Unchanged;
            if (!string.IsNullOrEmpty(text))
            {
                _context.ClientAnswerAdditionals.Add(new ClientAnswerAdditional { AnswerId = answer.Id.Value, ClientId = client.Id.Value, Text = text });
            }
            _context.SaveChanges();
        }

        public void AddQuestion(Client client, Question question)
        {
            var quest = _context.Questions.FirstOrDefault(a => a.Id == question.Id);
            client.Questions.Add(quest);
            _context.Entry(client).State = EntityState.Unchanged;
            _context.SaveChanges();
        }

        public IQueryable<Client> Find() => _context.Clients;

        public IQueryable<Client> FindPage(int page, int count)=>
          Find().OrderBy(i => i.Name).Skip(count * (page - 1)).Take(count);

        public IQueryable<Client> FindPage(int page, int count, int groupId) =>
            Find(groupId).OrderBy(i => i.Name).Skip(count * (page - 1)).Take(count);

        public IQueryable<Client> Find(int groupId) => 
            _context.Clients.Where(c => c.ClientGroups.Any(g => g.Id == groupId));

        public Client FindById(int id)=>Find().FirstOrDefault(c=>c.Id==id);

        public Client Add(Client entity)
        {
            _context.Clients.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Client Update(Client entity)
        {
            _context.Entry(entity).State = EntityState.Modified;     
            _context.SaveChanges();
            return entity;
        }

        public Client Remove(Client entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }


        
    }
}
