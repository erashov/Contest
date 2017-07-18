using System.Linq;
using System.Web.Http;
using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;

namespace TestStaff.Admin.Controllers
{

    public class TestController : ApiController
    {
        private readonly ITestRepository _testRepository;

        public TestController(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }

        public PagingModel<Test> Get(int page, int count, int? parentId = null)
        {
            return new PagingModel<Test>
            {
                Records = _testRepository.FindPage(page, count, parentId),
                Count = _testRepository.FindByParentId(parentId).Count()
            };
        }

        public Test Get(int id)
        {
            return _testRepository.FindById(id);
        }

        public Test Post(Test contest)
        {
           return _testRepository.Add(contest);
        }

        [HttpPut]
        public Test Put(Test contest)
        {
           
           return _testRepository.Update(contest);
        }

        [HttpDelete]
        public Test Delete(Test contest)
        {
           return _testRepository.Remove(contest);
        }
    }
}
