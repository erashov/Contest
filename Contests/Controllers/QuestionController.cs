using ContestsClients.Admin.Models;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace ContestsClients.Admin.Controllers
{
    public class QuestionController : ApiController
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }
        public PagingModel<Question> Get(int page, int count, int contestId)
        {
            return new PagingModel<Question>
            {
                Records = _questionRepository.FindPage(page, count, contestId),
                Count = _questionRepository.Find(contestId).Count()
            };
        }
        public Question Get(int id) => _questionRepository.FindById(id);
        public Question Post(Question add) => _questionRepository.Add(add);
        public Question Put(Question update) => _questionRepository.Update(update);
        public Question Delete(Question remove) => _questionRepository.Remove(remove);
        public IQueryable<QuestionType> GetListType() => _questionRepository.GetListType();

    }
}
