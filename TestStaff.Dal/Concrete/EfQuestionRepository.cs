using System;
using System.Linq;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Data.Entity;

namespace TestStaff.Dal.Concrete
{
    public class EfQuestionRepository : IQuestionRepository
    {
        private readonly EfTestClientsDbContext _context;

        public EfQuestionRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public Question Add(Question entity)
        {
            _context.Questions.Add(entity);
            _context.SaveChanges();
         //   entity.QuestionType = _context.QuestionTypes.FirstOrDefault(t => t.Id == entity.QuestionTypeId);
            return entity;
        }

        public IQueryable<Question> Find() => _context.Questions;

        public IQueryable<Question> Find(int testId) => _context.Questions.Where(q => q.TestId == testId);

        public Question FindById(int id)
        {
            return _context.Questions.FirstOrDefault(i => i.Id == id);
        }

        public IQueryable<Question> FindPage(int page, int count)
        {
            return Find().OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }

        public IQueryable<Question> FindPage(int page, int count, int testId)
        {
            return Find(testId).OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }



        public Question Remove(Question entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            //entity.QuestionType = _context.QuestionTypes.FirstOrDefault(t => t.Id == entity.QuestionTypeId);
            return entity;
        }

        public Question Update(Question entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
            //entity.QuestionType = _context.QuestionTypes.FirstOrDefault(t => t.Id == entity.QuestionTypeId);
            return entity;
        }
    }
}
