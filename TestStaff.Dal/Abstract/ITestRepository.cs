using System.Collections.Generic;
using System.Linq;
using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Abstract
{
    public interface ITestRepository : IBaseRepository<Test>
    {
        Question GetLastQuestion(int contestId, string email);
        IQueryable<Test> FindByParentId(int? id);
        IQueryable<Test> FindPage(int page, int count, int? parentId);
        List<Question> GetAllQuestion(int testId);
    }
}
