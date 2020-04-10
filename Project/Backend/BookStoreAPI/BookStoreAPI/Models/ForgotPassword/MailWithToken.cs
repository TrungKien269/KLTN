using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.ForgotPassword
{
    public class MailWithToken
    {
        public string Email { get; set; }
        public string Token { get; set; }

        public MailWithToken() { }

        public MailWithToken(string email, string token)
        {
            this.Email = email;
            this.Token = token;
        }
    }
}
