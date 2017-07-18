using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Abstract
{
    public interface IEmployeeGroupRepository : IBaseRepository<EmployeeGroup>
    {
        void AddClientGroup(Employee client, EmployeeGroup group);
    }
}
