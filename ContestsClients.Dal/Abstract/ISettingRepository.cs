using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Abstract
{
    public interface ISettingRepository
    {
        Setting GetValue(string key);
      
    }
}
