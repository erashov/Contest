using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Concrete;
using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Concrete
{
    public class EfTestRepository : ITestRepository
    {
        private readonly EfTestClientsDbContext _context;

        public EfTestRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public IQueryable<Test> Find() => _context.Tests;
        public IQueryable<Test> FindByParentId(int? id) => _context.Tests.Include("Questions").Include("ChildTests").Where(t=>t.ParentId==id);

        public IQueryable<Test> FindPage(int page, int count)
        {
            return Find().OrderByDescending(i => i.CreateDate).Skip(count * (page - 1)).Take(count);
        }
        public IQueryable<Test> FindPage(int page, int count, int? parentId)
        {
            return FindByParentId(parentId).OrderBy(i => i.Id).Skip(count * (page - 1)).Take(count);
        }
        public Test FindById(int id)
        {           
            return _context.Tests.Include("Questions").Include("ChildTests").FirstOrDefault(i => i.Id == id);
        }    

        public Test Add(Test entity)
        {
            entity.CreateDate = DateTime.Now;
            _context.Tests.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Test Update(Test entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Modified;
            entity.CreateDate = DateTime.Now;
            _context.SaveChanges();
            return entity;
        }

        public Test Remove(Test entity)
        {
            _context.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }

        public Question GetLastQuestion(int testId, string email)
        {
            var allQuestion= _context.Database.SqlQuery<Question>("EXEC GetQuestionsByTestId @id", new SqlParameter("id", testId)).Select(c=> c.Id).ToArray();
            var compliteQuestion = _context.Database.SqlQuery<Question>("EXEC GetCompliteQuestions @id, @email", new SqlParameter("id", testId), new SqlParameter("email", email)).Select(c => c.Id).ToArray();
            var expect = allQuestion.Except(compliteQuestion).FirstOrDefault();
            var nextQuestion = _context.Questions.Include("Answers").FirstOrDefault(q => q.Id == expect);   
            return nextQuestion;
        }

        public List<Question> GetAllQuestion(int testId)
        {
            List<Question> questions = new List<Question>();
            foreach(var q in _context.Database.SqlQuery<Question>("EXEC GetQuestionsByTestId @id", new SqlParameter("id", testId)).ToList())
            {
                var countAnswer = _context.Answers.Where(a => a.QuestionId == q.Id).Sum(c => c.Rating);
                var question = _context.Questions.Include("Answers").Include("Test").FirstOrDefault(c => c.Id == q.Id);
                question.HasManyCorrectAnswer = (countAnswer > 1);
               questions.Add(question);
            }
       
            return questions;
        }


    }
}
