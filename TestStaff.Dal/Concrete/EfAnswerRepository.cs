using System.Linq;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Data.Entity;

namespace TestStaff.Dal.Concrete
{
    public class EfAnswerRepository : IAnswerRepository
    {
        private readonly EfTestClientsDbContext _context;

        public EfAnswerRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public Answer Add(Answer entity)
        {
            _context.Answers.Add(entity);
            _context.SaveChanges();

            return entity;
        }

        public IQueryable<Answer> Find() => _context.Answers;

        public IQueryable<Answer> Find(int questionId)=> _context.Answers.Where(a=>a.QuestionId==questionId);

        public Answer FindById(int id)
        {
            return _context.Answers.FirstOrDefault(i => i.Id == id);
        }

        public IQueryable<Answer> FindPage(int page, int count)
        {
            return Find().OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }

        public IQueryable<Answer> FindPage(int page, int count, int questionId)
        {
            return Find(questionId).OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }



        public Answer Remove(Answer entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();

            return entity;
        }

        public Answer Update(Answer entity)
        {
           _context.Entry(entity).State= EntityState.Modified;
           _context.SaveChanges();

            return entity;
        }


    }
}
