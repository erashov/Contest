using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System;
using System.Data.Entity;
using System.Linq;

namespace TestStaff.Dal.Concrete
{
    public class EfEmployeeGroupRepository : IEmployeeGroupRepository
    {
        private readonly EfTestClientsDbContext _context;
        public EfEmployeeGroupRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }
        public EmployeeGroup Add(EmployeeGroup entity)
        {
            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
            return entity;
        }

        public void AddClientGroup(Employee client, EmployeeGroup group)
        {
            throw new NotImplementedException();
        }

        public IQueryable<EmployeeGroup> Find() => _context.EmployeeGroups;

        public EmployeeGroup FindById(int id)
        {
            return _context.EmployeeGroups.FirstOrDefault(i => i.Id == id);
        }

        public IQueryable<EmployeeGroup> FindPage(int page, int count)
        {
            return Find().OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }

        public EmployeeGroup Remove(EmployeeGroup entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }

        public EmployeeGroup Update(EmployeeGroup entity)
        {
            EmployeeGroup group =_context.EmployeeGroups.Include(x => x.Employees).FirstOrDefault(c=>c.Id==entity.Id);
            var addClients = entity.Employees.Except(group.Employees).ToList();
            var deleteClient = group.Employees.Except(entity.Employees).ToList();        
            
            foreach (var del in deleteClient)
            {                
                group.Employees.Remove(_context.Employees.FirstOrDefault(t => t.Id == del.Id));
            }
            foreach (var add in addClients)
            {                
                group.Employees.Add(_context.Employees.FirstOrDefault(t => t.Id == add.Id));
            }
            group.Name = entity.Name;
            _context.SaveChanges();

            return entity;
        }
    }
}
