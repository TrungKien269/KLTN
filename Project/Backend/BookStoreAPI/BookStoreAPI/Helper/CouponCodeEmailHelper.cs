using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.Helper
{
    public static class CouponCodeEmailHelper
    {
        public static async Task<Response> SendEmail(CouponCode couponCode, int userID)
        {
            try
            {
                var accountBal = new AccountBAL();
                var account = (await accountBal.GetAccount(userID)).Obj as Account;

                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("pokemon.ute19.06@gmail.com", "Book Store");
                message.Subject = "COUPON CODE";
                message.IsBodyHtml = true;
                message.To.Add(new MailAddress(account.Email, "Customer"));

                StringBuilder sb = new StringBuilder();
                sb.Append("<html>");
                sb.Append("<body>");
                sb.Append("<h1>New Coupon Code</h1><br/>");
                sb.Append("<p>Due to many orders that you puchased recently, we will give you a new coupon code</p>");
                sb.Append("<p>This code is: <b>" + couponCode.Id + "</b></p>");
                sb.Append("<p>You use this code for reducing: <b>" + (couponCode.Value * 100).ToString("####") +
                          "%</b> total price in your order</p>");
                sb.Append("<br/><br/><br/>");
                sb.Append("<p style='font-size:16px;'>Thank you for purchasing at our store</p>");
                sb.Append("<p style='font-size:16px;'>Regards</p><br/>");
                sb.Append("<p style='font-size:16px;'>Book Store</p>");
                sb.Append("</body>");
                sb.Append("</html>");

                message.Body = sb.ToString();
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new NetworkCredential("pokemon.ute19.06@gmail.com", "Pokemon@123");
                await smtp.SendMailAsync(message);

                return new Response("Success", true, 1, couponCode);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
