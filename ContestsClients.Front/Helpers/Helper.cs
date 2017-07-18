using System;

namespace ContestsClients.Front.Helpers
{
    public static class Helper
    {
        public static string GetUserName(string email, string adName)
        {
            return email == String.Empty ? adName : email;
        }
    }
}