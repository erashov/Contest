using System.Linq;
using System.Web.Http;
using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;

namespace TestStaff.Admin.Controllers
{
    public class AnswerController : ApiController
    {
        private IAnswerRepository _answerRepository;
        public AnswerController( IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }
        public PagingModel<Answer> Get(int page, int count, int questionId)
        {
            return new PagingModel<Answer>
            {
                Records = _answerRepository.FindPage(page, count, questionId),
                Count = _answerRepository.Find().Count()
            };
        }

        public Answer Get(int id)
        {
            return _answerRepository.FindById(id);
        }
        
        public Answer Post(Answer answer)
        {
            return _answerRepository.Add(answer);
        }

        [HttpPut]
        public Answer Put(Answer answer)
        {
            return _answerRepository.Update(answer);
        }

        [HttpDelete]
        public Answer Delete(Answer answer)
        {
            return _answerRepository.Remove(answer);
        }

    }
}
