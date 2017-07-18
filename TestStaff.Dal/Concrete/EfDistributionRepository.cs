using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Data.Entity;
using System.Linq;

namespace TestStaff.Dal.Concrete
{
    public class EfDistributionRepository : IBaseRepository<Distribution>
    {
        private readonly EfTestClientsDbContext _context;
        public EfDistributionRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public Distribution Add(Distribution entity)
        {
            _context.Distributions.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public IQueryable<Distribution> Find() => _context.Distributions;

        public Distribution FindById(int id) => _context.Distributions.FirstOrDefault(i => i.Id == id);

        public IQueryable<Distribution> FindPage(int page, int count) => Find().OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);


        public Distribution Remove(Distribution entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }

        public Distribution Update(Distribution entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
            return entity;
        }
    }
}
