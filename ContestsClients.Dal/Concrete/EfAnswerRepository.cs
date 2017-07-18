using System.Linq;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System.Data.Entity;
using System;

namespace ContestsClients.Dal.Concrete
{
    public class EfAnswerRepository : IAnswerRepository
    {
        private readonly EfContestsClientsDbContext _context;

        public EfAnswerRepository(EfContestsClientsDbContext context)
        {
            _context = context;
        }

        public Answer Add(Answer entity)
        {
            _context.Answers.Add(entity);
            _context.SaveChanges();
            entity.AnswerType = _context.AnswerTypes.FirstOrDefault(t => t.Id == entity.AnswerTypeId);
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

        public IQueryable<AnswerType> GetListType() => _context.AnswerTypes;

        public Answer Remove(Answer entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            entity.AnswerType = _context.AnswerTypes.FirstOrDefault(t => t.Id == entity.AnswerTypeId);
            return entity;
        }

        public Answer Update(Answer entity)
        {
           _context.Entry(entity).State= EntityState.Modified;
           _context.SaveChanges();
            entity.AnswerType = _context.AnswerTypes.FirstOrDefault(t => t.Id == entity.AnswerTypeId);
            return entity;
        }


    }
}
