using System.Net.Mail;
using ContestsClients.Admin.Models;

namespace ContestsClients.Admin.Helpers
{
    public static class Helper
    {
        public static string GetUserName(string email, string adName)
        {
            return email == string.Empty ? adName : email;
        }

        public static void SendEmail(EmailModel model)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.To.Add(model.MailTo);
                mail.From = new MailAddress(model.MailFrom);
                mail.Subject = model.Subject;
                mail.Body = model.Body;
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient())
                {
                    smtp.Host = model.Host;
                    smtp.Port = model.Port;
                    smtp.UseDefaultCredentials = false;
                    smtp.Send(mail);
                }
            }
        }
    }
}