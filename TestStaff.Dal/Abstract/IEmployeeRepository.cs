using System.Linq;
using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Abstract
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        IQueryable<Employee> FindPage(int page, int count, int groupId);
        IQueryable<Employee> Find(int groupId);
        Employee GetByEmail(string email);
        void AddAnswer(Employee client, Answer answer, string text);
        void AddQuestion(Employee client, Question question);
    }
}
