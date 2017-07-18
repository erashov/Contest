using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContestsClients.Admin.Models
{
    public class EmailModel
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public string Body { get; set; }

        public string MailFrom { get; set; }

        public string MailTo { get; set; }

        public string Subject { get; set; }
    }
}