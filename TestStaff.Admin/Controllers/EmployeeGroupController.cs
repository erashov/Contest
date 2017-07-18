using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace TestStaff.Admin.Controllers
{
    public class EmployeeGroupController : ApiController
    {
        private readonly IEmployeeGroupRepository _employeeGroupRepository;
        public EmployeeGroupController(IEmployeeGroupRepository employeeGroupRepository)
        {
            _employeeGroupRepository = employeeGroupRepository;
        }

        public PagingModel<EmployeeGroup> Get(int page, int count)
        {
            return new PagingModel<EmployeeGroup>
            {
                Records = _employeeGroupRepository.FindPage(page, count),
                Count = _employeeGroupRepository.Find().Count()
            };
        }

        public EmployeeGroup Get(int id)
        {
            return _employeeGroupRepository.FindById(id);
        }

        public EmployeeGroup Post(EmployeeGroup group)
        {
            return _employeeGroupRepository.Add(group);
        }

        [HttpPut]
        public EmployeeGroup Put(EmployeeGroup group)
        {
            return _employeeGroupRepository.Update(group);
        }

        [HttpDelete]
        public EmployeeGroup Delete(EmployeeGroup group)
        {
            return _employeeGroupRepository.Remove(group);
        }
    }
}
