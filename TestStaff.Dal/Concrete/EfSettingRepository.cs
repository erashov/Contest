using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Linq;

namespace TestStaff.Dal.Concrete
{
    public class EfSettingRepository : ISettingRepository
    {
        private readonly EfTestClientsDbContext _context;
        public EfSettingRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public Setting GetValue(string key) => _context.Settings.FirstOrDefault(s => s.Key == key);
    }
}
