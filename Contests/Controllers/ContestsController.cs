using System.Linq;
using System.Web.Http;
using ContestsClients.Admin.Models;
using ContestsClients.Dal.Abstract;
using ContestsClients.Dal.Entities;
using System;
using System.Collections.Generic;

namespace ContestsClients.Admin.Controllers
{

    public class ContestsController : ApiController
    {
        private readonly IContestRepository _contestRepository;

        public ContestsController(IContestRepository contestRepository)
        {
            _contestRepository = contestRepository;
        }

        public PagingModel<Contest> Get(int page, int count)
        {
            return new PagingModel<Contest>
            {
                Records = _contestRepository.FindPage(page, count),
                Count = _contestRepository.Find().Count()
            };
        }

        public Contest Get(int id)
        {
            return _contestRepository.FindById(id);
        }

        public Contest Post(Contest contest)
        {
           return _contestRepository.Add(contest);
        }

        public Contest Put(Contest contest)
        {
           
           return _contestRepository.Update(contest);
        }

        public Contest Delete(Contest contest)
        {
           return _contestRepository.Remove(contest);
        }
    }
}
