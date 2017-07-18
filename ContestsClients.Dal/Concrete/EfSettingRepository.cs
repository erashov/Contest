using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System.Linq;

namespace ContestsClients.Dal.Concrete
{
    public class EfSettingRepository : ISettingRepository
    {
        private readonly EfContestsClientsDbContext _context;
        public EfSettingRepository(EfContestsClientsDbContext context)
        {
            _context = context;
        }

        public Setting GetValue(string key) => _context.Settings.FirstOrDefault(s => s.Key == key);
    }
}
