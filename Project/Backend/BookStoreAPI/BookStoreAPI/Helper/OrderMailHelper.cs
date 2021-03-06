﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Checkout;

namespace BookStoreAPI.Helper
{
    public static class OrderMailHelper
    {
        public static async Task<Response> SendEmail(string email, OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("pokemon.ute19.06@gmail.com", "Book Store");
                message.To.Add(new MailAddress(email, "Customer"));
                message.Subject = "NEW RECEIPT";
                message.IsBodyHtml = true;

                StringBuilder sb = new StringBuilder();
                sb.Append("<html>");
                sb.Append("<head><style>");
                sb.Append("table{font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif; " +
                          "border-collapse: collapse;}");
                sb.Append("table td, table th {border: 1px solid black; padding: 8px;}");
                sb.Append("th{padding-top: 12px; padding-bottom: 12px;}");
                sb.Append("</style></head>");
                sb.Append("<body>");
                sb.Append("<h1>Your newest order</h1><br/>");
                sb.Append("<table");
                sb.Append("<tr style='text-align:center;'>" +
                          "<th><b>ID</b></th>" +
                          "<th><b>Book</b></th>" +
                          "<th><b>Price</b></th>" +
                          "<th><b>Quantity</b</th>" +
                          "<th><b>SubTotal</b></th>" +
                          "</tr>");
                for (int i = 0; i < orderDetailRequests.Count; i++)
                {
                    sb.Append("<tr>" +
                              "<td style='text-align:center'>" + (i + 1) + "</td>" +
                              "<td>" + orderDetailRequests[i].BookName + "</td>" +
                              "<td style='text-align:center'>" + Convert.ToDecimal(orderDetailRequests[i].CurrentPrice).ToString("#,##") + " VND" + "</td>" +
                              "<td style='text-align:center'>" + orderDetailRequests[i].Quantity + "</td>" +
                              "<td style='text-align:center'>" +
                              Convert.ToDecimal(orderDetailRequests[i].CurrentPrice * orderDetailRequests[i].Quantity).ToString("#,##") + " VND" + "</td>" +
                              "</tr>");
                }
                sb.Append("</table>");
                sb.Append("<p>Shipping Fee: &nbsp;" + Convert.ToDecimal(orderRequest.ShippingFee).ToString("#,##") + "&nbsp; VND</p>");
                sb.Append("<p><b>Total:</b> &nbsp;" +
                          Convert.ToDecimal(orderRequest.Total).ToString("#,##") +
                          "&nbsp; VND</p>");
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

                return new Response("Success", true, 1, email);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
