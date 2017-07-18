using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Linq;
using System.Web.Http;

namespace TestStaff.Admin.Controllers
{

    public class EmployeeController : ApiController
    {
        private IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository clientRepository)
        {
            _employeeRepository = clientRepository;
        }
        public PagingModel<Employee> Get(int page, int count, int? groupId = null)
        {
            if (groupId == null)
            {
                return new PagingModel<Employee>
                {
                    Records = _employeeRepository.FindPage(page, count),
                    Count = _employeeRepository.Find().Count()
                };
            }

            return new PagingModel<Employee>
            {
                Records = _employeeRepository.FindPage(page, count, groupId.Value),
                Count = _employeeRepository.Find(groupId.Value).Count()
            };
        }

        public Employee Get(int id)
        {
            return _employeeRepository.FindById(id);
        }

        public Employee Post(Employee contest)
        {
            return _employeeRepository.Add(contest);
        }

        [HttpPut]
        public Employee Put(Employee contest)
        {

            return _employeeRepository.Update(contest);
        }

        [HttpDelete]

        public Employee Delete(Employee contest)
        {
            return _employeeRepository.Remove(contest);
        }
    }
}
