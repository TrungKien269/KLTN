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
    public static class PromotionEmailHelper
    {
        public static async Task<Response> SendEmail(int promotionID)
        {
            try
            {
                var promotionBal = new PromotionBAL();
                var subcriptionEmailBal = new SubcriptionEmailBAL();

                var promotionResponse = await promotionBal.GetPromotion(promotionID);
                var promotionDetailList = (promotionResponse.Obj as Promotion).PromotionDetail.ToList();
                var promotion = promotionResponse.Obj as Promotion;

                var subEmailResponse = await subcriptionEmailBal.GeteListEmail();
                var subEmailList = (subEmailResponse.Obj as List<SubscriptionEmail>);

                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("pokemon.ute19.06@gmail.com", "Book Store");
                message.Subject = "NEW PROMOTION";
                message.IsBodyHtml = true;

                if (subEmailList is null)
                {
                    return new Response("System doesn't file any subcribed emai!", false, 0, null);
                }
                else
                {
                    if (promotion is null)
                    {
                        return new Response("System doesn't find any promoted book!", false, 0, null);
                    }
                    else
                    {
                        subEmailList.ForEach(x =>
                        {
                            message.To.Add(new MailAddress(x.Email, "Customer"));
                        });

                        StringBuilder sb = new StringBuilder();
                        sb.Append("<html>");
                        sb.Append("<head><style>");
                        sb.Append("table{font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif; " +
                                  "border-collapse: collapse;}");
                        sb.Append("table td, table th {border: 1px solid black; padding: 8px;}");
                        sb.Append("th{padding-top: 12px; padding-bottom: 12px;}");
                        sb.Append("</style></head>");
                        sb.Append("<body>");
                        sb.Append("<h1>List new Promotion Book</h1><br/>");
                        sb.Append("<table");
                        sb.Append("<tr style='text-align:center;'>" +
                                  "<th><b>ID</b></th>" +
                                  "<th><b>Book</b></th>" +
                                  "<th><b>Original Price</b></th>" +
                                  "<th><b>Promotion Price</b</th>" +
                                  "<th><b>Promotion Rate</b></th>" +
                                  "</tr>");
                        for (int i = 0; i < promotionDetailList.Count; i++)
                        {
                            sb.Append("<tr>" +
                                      "<td style='text-align:center'>" + (i + 1) + "</td>" +
                                      "<td>" + promotionDetailList[i].Book.Name + "</td>" +
                                      "<td style='text-align:center'>" + Convert.ToDecimal(promotionDetailList[i].Book.OriginalPrice).ToString("#,##") + " VND" + "</td>" +
                                      "<td style='text-align:center'>" + Convert.ToDecimal(promotionDetailList[i].Book.CurrentPrice).ToString("#,##") + " VND" + "</td>" +
                                      "<td style='text-align:center'>" + (promotionDetailList[i].Discount * 100) + "%" + "</td>" +
                                      "</tr>");
                        }
                        sb.Append("</table>");
                        sb.Append("<p>Expired Time: &nbsp;" + promotion.EndedDate.ToString("dd/MM/yyyy hh:mm:ss") + "</p>");
                        sb.Append("<p style='font-size:16px;'>Thank you for subcribing our store</p>");
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

                        return new Response("Success", true, 1, subEmailList);
                    }
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
