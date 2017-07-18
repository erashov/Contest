using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using TestStaff.Admin.Models;
using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;

namespace TestStaff.Admin.Controllers
{
    public class DistributionController : ApiController
    {
        private readonly IBaseRepository<Distribution> _distributionRepository;
        private readonly ISettingRepository _settingRepoisitory;
        private readonly IEmployeeGroupRepository _employeeGroupRepository;

        public DistributionController(
            IBaseRepository<Distribution> distributionRepository,
            ISettingRepository settingRepository,
            IEmployeeGroupRepository employeeGroupRepository)
        {
            _distributionRepository = distributionRepository;
            _settingRepoisitory = settingRepository;
            _employeeGroupRepository = employeeGroupRepository;
        }
        public Distribution Get(int id)
        {
            return _distributionRepository.FindById(id);
        }

        public Distribution Post(DisributionView distribution)
        {
            string messageTemplate = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/Views/MessageTemplate.html"));
            string templateContestURL = _settingRepoisitory.GetValue("TemplateContestURL").Value;
            string mailFrom = _settingRepoisitory.GetValue("MailFrom").Value;
            string smptpHost = _settingRepoisitory.GetValue("SmtpHost").Value;
            int smptpPort = int.Parse(_settingRepoisitory.GetValue("SmtpPort").Value);

            List<Employee> clients = new List<Employee>();
            foreach (var gr in distribution.SelectGroups)
            {
                var groupClients = _employeeGroupRepository
                    .Find()
                    .Include(c => c.Employees)
                    .FirstOrDefault(p => p.Id == gr.Id)
                    .Employees;
                clients.AddRange(groupClients);
            }

            var savedDistribution = _distributionRepository.Add(new Distribution
            {
                Text = distribution.Text,
                Subject = distribution.Subject,
                TestId = distribution.TestId,
                CreateDate = DateTime.Now
            });

            foreach (var client in clients.Distinct())
            {
                var url = templateContestURL
                    .Replace("EMAIL_ADDRESS", client.Email)
                    .Replace("CONTEST_ID", distribution.TestId.ToString());

                string body = messageTemplate
                    .Replace("$TEXT$", distribution.Text)
                    .Replace("$URL$", url);

                var emailModel = new EmailModel
                {
                    Host = smptpHost,
                    Port = smptpPort,
                    MailFrom = mailFrom,
                    MailTo = client.Email,
                    Body = body,
                    Subject = distribution.Subject,
                };

                LogDistribution addLog = new LogDistribution
                {
                    Distribution = savedDistribution,
                    Email = client.Email,
                    SendDate = DateTime.Now
                };

                try
                {
                    Helpers.Helper.SendEmail(emailModel);
                }
                catch (Exception e)
                {
                    addLog.Error = JsonConvert.SerializeObject(e);
                }
                finally
                {
                    savedDistribution.LogDistributions.Add(addLog);
                    _distributionRepository.Update(savedDistribution);
                }
            }

            savedDistribution.LogDistributions = null;

            return savedDistribution;
        }

        [HttpPut]
        public Distribution Put(Distribution answer)
        {
            return _distributionRepository.Update(answer);
        }

        [HttpDelete]
        public Distribution Delete(Distribution answer)
        {
            return _distributionRepository.Remove(answer);
        }
    }
}
