using TestStaff.Dal.Entities;
using System.Collections.Generic;
using System.Linq;

namespace TestStaff.Dal.Abstract
{
    public interface IAnswerRepository:IBaseRepository<Answer>
    {
        IQueryable<Answer> FindPage(int page, int count, int questionId);
        IQueryable<Answer> Find(int questionId);

    }
}
