using ContestsClients.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContestsClients.Dal.Abstract
{
   public interface IQuestionRepository:IBaseRepository<Question>
    {
        IQueryable<Question> FindPage(int page, int count, int contestId);
        IQueryable<Question> Find(int contestId);
        IQueryable<QuestionType> GetListType();
    }
}
