using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System;
using System.Data.Entity;
using System.Linq;

namespace ContestsClients.Dal.Concrete
{
    public class EfClientGroupRepository : IClientGroupRepository
    {
        private readonly EfContestsClientsDbContext _context;
        public EfClientGroupRepository(EfContestsClientsDbContext context)
        {
            _context = context;
        }
        public ClientGroup Add(ClientGroup entity)
        {
            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
            return entity;
        }

        public void AddClientGroup(Client client, ClientGroup group)
        {
            throw new NotImplementedException();
        }

        public IQueryable<ClientGroup> Find() => _context.ClientGroups;

        public ClientGroup FindById(int id)
        {
            return _context.ClientGroups.FirstOrDefault(i => i.Id == id);
        }

        public IQueryable<ClientGroup> FindPage(int page, int count)
        {
            return Find().OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }

        public ClientGroup Remove(ClientGroup entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }

        public ClientGroup Update(ClientGroup entity)
        {
            ClientGroup group =_context.ClientGroups.Include(x => x.Clients).FirstOrDefault(c=>c.Id==entity.Id);
            var addClients = entity.Clients.Except(group.Clients).ToList();
            var deleteClient = group.Clients.Except(entity.Clients).ToList();        
            
            foreach (var del in deleteClient)
            {                
                group.Clients.Remove(_context.Clients.FirstOrDefault(t => t.Id == del.Id));
            }
            foreach (var add in addClients)
            {                
                group.Clients.Add(_context.Clients.FirstOrDefault(t => t.Id == add.Id));
            }
            group.Name = entity.Name;
            _context.SaveChanges();

            return entity;
        }
    }
}
