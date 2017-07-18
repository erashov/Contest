using System.Data.Entity;
using System.Linq;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;

namespace TestStaff.Dal.Concrete
{
    public class EfEmployeeRepository : IEmployeeRepository
    {
        private readonly EfTestClientsDbContext _context;

        public EfEmployeeRepository(EfTestClientsDbContext context)
        {
            _context = context;
        }

        public Employee GetByEmail(string email)
        {
            return _context.Employees.FirstOrDefault(i => i.Email == email);
        }

        public void AddAnswer(Employee client, Answer answer, string text)
        {
            client.Answers.Add(answer);
            _context.Entry(answer).State = EntityState.Unchanged;
            if (!string.IsNullOrEmpty(text))
            {
                _context.EmployeeAnswerAdditionals.Add(
                    new EmployeeAnswerAdditional {
                        AnswerId = answer.Id.Value,
                        EmployeeId = client.Id.Value,
                        Text = text
                    });
            }
            _context.SaveChanges();
        }

        public void AddQuestion(Employee client, Question question)
        {
            var quest = _context.Questions.FirstOrDefault(a => a.Id == question.Id);
            client.Questions.Add(quest);
            _context.Entry(client).State = EntityState.Unchanged;
            _context.SaveChanges();
        }

        public IQueryable<Employee> Find() => _context.Employees;

        public IQueryable<Employee> FindPage(int page, int count)=>
          Find().OrderBy(i => i.Name).Skip(count * (page - 1)).Take(count);

        public IQueryable<Employee> FindPage(int page, int count, int groupId) =>
            Find(groupId).OrderBy(i => i.Name).Skip(count * (page - 1)).Take(count);

        public IQueryable<Employee> Find(int groupId) => 
            _context.Employees.Where(c => c.EmployeeGroups.Any(g => g.Id == groupId));

        public Employee FindById(int id)=>Find().FirstOrDefault(c=>c.Id==id);

        public Employee Add(Employee entity)
        {
            _context.Employees.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Employee Update(Employee entity)
        {
            _context.Entry(entity).State = EntityState.Modified;     
            _context.SaveChanges();
            return entity;
        }

        public Employee Remove(Employee entity)
        {
            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
            return entity;
        }


        
    }
}
