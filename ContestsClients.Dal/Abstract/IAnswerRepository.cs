using ContestsClients.Dal.Entities;
using System.Collections.Generic;
using System.Linq;

namespace ContestsClients.Dal.Abstract
{
    public interface IAnswerRepository:IBaseRepository<Answer>
    {
        IQueryable<Answer> FindPage(int page, int count, int questionId);
        IQueryable<Answer> Find(int questionId);
        IQueryable<AnswerType> GetListType();
    }
}
