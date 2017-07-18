using TestStaff.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestStaff.Dal.Abstract
{
   public interface IQuestionRepository:IBaseRepository<Question>
    {
        IQueryable<Question> FindPage(int page, int count, int testId);
        IQueryable<Question> Find(int testId);

    }
}
