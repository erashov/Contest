using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using TestStaff.Front.Helpers;
using TestStaff.Front.Models;

namespace TestStaff.Front.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITestRepository _contestRepository;        

        private readonly IEmployeeRepository _clientRepository;

        private const string testUser = "TestUser@akado.com";

        public HomeController(ITestRepository contestRepository, IEmployeeRepository clientRepository)
        {
            _contestRepository = contestRepository;
            _clientRepository = clientRepository;
        }

        public ActionResult Index(int id, string email = "")
        {
            var contest = this._contestRepository.Find().Include("ChildTests").Include("Questions.Answers").FirstOrDefault(i => i.Id == id);
            contest.Questions = _contestRepository.GetAllQuestion(id);
            var client = this._clientRepository.GetByEmail(email);

            if (client == null && email != testUser)
            {
                return View("Auth");
            }

            Question question = this._contestRepository.GetLastQuestion(contest.Id.Value, email);

            var model = new TestViewModel
            {
                Test = contest,
                Employee = client,
                LastQuestion = question
            };

            return View(model);
        }

        [HttpPost]
        public JsonResult AnswerQuestion(AnswerView answ)
        {
            string userName = Helper.GetUserName(answ.Email, User.Identity.Name);

            if (string.IsNullOrEmpty(userName))
            {
                throw new ArgumentException("email is required");
            }

            // Этот пользователь нужен чтобы можно было просмотреть опросник
            if (answ.Email != testUser)
            {
                var client = this._clientRepository.GetByEmail(userName);
                foreach (var a in answ.Answers)
                {
                    var answer = new Dal.Entities.Answer { Id = a.AnswerId, QuestionId = answ.QuestionId };
                    var question = new Dal.Entities.Question { Id = answ.QuestionId };
                    this._clientRepository.AddAnswer(client, answer, a.Text);
                    this._clientRepository.AddQuestion(client,question);
                }
            }

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}
