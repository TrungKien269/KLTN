using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Checkout;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;
using OrderRequest = BookStoreAPI.Models.Checkout.OrderRequest;

namespace BookStoreAPI.Helper
{
    public static class PayPalPaymentHelper
    {
        public static async Task<Response> CreatePayPalOrder(string email, string PayPalOrderID,
            OrderRequest orderRequest, List<OrderDetailRequest> orderDetailRequests)
        {
            try
            {
                PayPalEnvironment environment = new SandboxEnvironment(PayPalSettings.ClientId, PayPalSettings.Secret);
                HttpClient client = new PayPalHttpClient(environment);

                var request = new OrdersCaptureRequest(PayPalOrderID);
                request.Prefer("return=representation");
                request.RequestBody(new OrderActionRequest());

                var response = await client.Execute(request);
                var result = response.Result<PayPalCheckoutSdk.Orders.Order>();

                if (result.Status.Equals("COMPLETED"))
                {
                    await SendReceiptToEmail(email, orderRequest, orderDetailRequests);
                    return new Response("Success", true, 1, response);
                }
                else
                {
                    return new Response("Error", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public static async Task<Response> SendReceiptToEmail(string email, OrderRequest orderRequest,
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
                          "<th><b>Amount</b></th>" +
                          "</tr>");
                for (int i = 0; i < orderDetailRequests.Count; i++)
                {
                    sb.Append("<tr>" +
                              "<td style='text-align:center'>" + (i + 1) + "</td>" +
                              "<td>" + orderDetailRequests[i].BookName + "</td>" +
                              "<td style='text-align:center'>" + orderDetailRequests[i].CurrentPrice + "</td>" +
                              "<td style='text-align:center'>" + orderDetailRequests[i].Quantity + "</td>" +
                              "<td style='text-align:center'>" +
                              (orderDetailRequests[i].CurrentPrice * orderDetailRequests[i].Quantity) + "</td>" +
                              "</tr>");
                }
                sb.Append("</table>");
                sb.Append("<p>Shipping Fee: &nbsp;" + orderRequest.ShippingFee + " &nbsp; VND</p>");
                sb.Append("<p><b>Total:</b> &nbsp;" +
                          (orderRequest.ShippingFee + orderDetailRequests.Sum(x => x.Quantity * x.CurrentPrice)) +
                          " &nbsp; VND</p>");
                sb.Append("<p>You can visit your PayPal account to follow your order charge</p>");
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
