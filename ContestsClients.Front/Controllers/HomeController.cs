using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using ContestsClients.Dal.Abstract;
using ContestsClients.Front.Helpers;
using ContestsClients.Front.Models;

namespace ContestsClients.Front.Controllers
{
    public class HomeController : Controller
    {
        private readonly IContestRepository _contestRepository;        

        private readonly IClientRepository _clientRepository;

        public HomeController(IContestRepository contestRepository, IClientRepository clientRepository)
        {
            this._contestRepository = contestRepository;
            this._clientRepository = clientRepository;
        }

        public ActionResult Index(int id, string email = "")
        {
            var contest = this._contestRepository.Find().Include("Questions.Answers").FirstOrDefault(i => i.Id == id);
            var client = this._clientRepository.GetByEmail(email);

            if (client == null)
            {
                return View("Auth");
            }

            var question = this._contestRepository.GetLastQuestion(contest.Id.Value, client.Id.Value);

            var model = new ContestViewModel
            {
                Contest = contest,
                Client = client,
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
            if (answ.Email != "TestUser@akado.com")
            {
                var client = this._clientRepository.GetByEmail(userName);
                foreach (var a in answ.Answers)
                {
                    var answer = new ContestsClients.Dal.Entities.Answer { Id = a.AnswerId, QuestionId = answ.QuestionId };
                    var question = new ContestsClients.Dal.Entities.Question { Id = answ.QuestionId };
                    this._clientRepository.AddAnswer(client, answer, a.Text);
                    this._clientRepository.AddQuestion(client,question);
                }
            }

            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}
