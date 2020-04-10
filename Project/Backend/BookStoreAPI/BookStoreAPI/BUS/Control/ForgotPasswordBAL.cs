using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.ForgotPassword;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class ForgotPasswordBAL
    {
        private AccountBAL accountBal;

        public ForgotPasswordBAL()
        {
            accountBal = new AccountBAL();
        }

        public async Task<Response> ValidateEmail(string email)
        {
            return await accountBal.GetAccountByEmail(email);
        }

        public async Task<Response> ConfirmEmail(string email)
        {
            try
            {
                var token = JWTHelper.CreateTemporaryToken();
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("pokemon.ute19.06@gmail.com", "Book Store");
                message.To.Add(new MailAddress(email, "Customer"));
                message.Subject = "RESET PASSWORD";
                message.IsBodyHtml = true;
                message.Body = "<p>Click this link to reset your password: " +
                               "<a href=" + "http://localhost:3000/ResetPassword?token=" + token + "?" + "email=" + email + ">" +
                               "http://localhost:3000/ResetPassword?token=" + token + "?" + "email=" + email + "</a></p>" +
                               "<br/><br/><br/>" +
                               "<p>This link will terminate in 5 minute later. Please to reset your password as early as possible</p>";
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential("pokemon.ute19.06@gmail.com", "Pokemon@123");
                await smtp.SendMailAsync(message);

                return new Response("Success", true, 1, new MailWithToken(email, token));
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> ResetPassword(string email, string newPassword)
        {
            var response = await ValidateEmail(email);
            if (response.Status)
            {
                return await accountBal.ChangePassword(response.Obj as Account, newPassword);
            }
            else
            {
                return response;
            }
        }
    }
}
