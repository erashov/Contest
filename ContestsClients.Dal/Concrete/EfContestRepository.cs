using System;
using System.Linq;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;

namespace ContestsClients.Dal.Concrete
{
    public class EfContestRepository : IContestRepository
    {
        private readonly EfContestsClientsDbContext _context;

        public EfContestRepository(EfContestsClientsDbContext context)
        {
            _context = context;
        }

        public IQueryable<Contest> Find() => _context.Contests;

        public IQueryable<Contest> FindPage(int page, int count)
        {
            return Find().OrderByDescending(i => i.CreateDate).Skip(count * (page - 1)).Take(count);
        }

        public Contest FindById(int id)
        {           
            return _context.Contests.FirstOrDefault(i => i.Id == id);
        }

        public Contest Add(Contest entity)
        {
            entity.CreateDate = DateTime.Now;
            _context.Contests.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Contest Update(Contest entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            entity.CreateDate = DateTime.Now;
            _context.SaveChanges();
            return entity;
        }

        public Contest Remove(Contest entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }

        public Question GetLastQuestion(int contestId, int clientId)
        {
            var allQuestions = FindById(contestId).Questions.ToList();
            var clientQuestions = _context.Clients.Include("Questions").FirstOrDefault(c => c.Id == clientId)?.Questions.ToList();
            return allQuestions.Except(clientQuestions).FirstOrDefault();
        }
    }
}
