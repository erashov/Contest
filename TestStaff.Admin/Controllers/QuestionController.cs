using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace TestStaff.Admin.Controllers
{
    public class QuestionController : ApiController
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }
        public PagingModel<Question> Get(int page, int count, int testId)
        {
            return new PagingModel<Question>
            {
                Records = _questionRepository.FindPage(page, count, testId),
                Count = _questionRepository.Find(testId).Count()
            };
        }
        public Question Get(int id) => _questionRepository.FindById(id);
        public Question Post(Question add) => _questionRepository.Add(add);

        [HttpPut]
        public Question Put(Question update) => _questionRepository.Update(update);

        [HttpDelete]
        public Question Delete(Question remove) => _questionRepository.Remove(remove);


    }
}
