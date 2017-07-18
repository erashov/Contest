using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Abstract
{
    public interface ISettingRepository
    {
        Setting GetValue(string key);
      
    }
}
