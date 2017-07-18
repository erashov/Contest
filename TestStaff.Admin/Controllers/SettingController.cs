using TestStaff.Dal.Abstract;
using TestStaff.Dal.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TestStaff.Admin.Controllers
{
    public class SettingController : ApiController
    {
        private readonly ISettingRepository _settingRepository;
        public SettingController(ISettingRepository settingRepository)
        {
            _settingRepository = settingRepository;
        }
        public Setting Get(string key) => _settingRepository.GetValue(key);
    }
}
