using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Checkout;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class ProceedOrderController : Controller
    {
        private ProceedOrderBAL userOrderBal;

        public ProceedOrderController()
        {
            this.userOrderBal = new ProceedOrderBAL();
        }

        [Authorize]
        [HttpGet("ListCartBook")]
        public async Task<Response> GetListCartBook()
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await userOrderBal.GetCart(userID);
            }
        }

        [HttpGet("OrderUserInfo")]
        [Authorize]
        public async Task<Response> GetOrderUserInfo()
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await userOrderBal.GetUser(userID);
            }
        }

        [HttpPost("CODCheckout")]
        [Authorize]
        public async Task<Response> CreateUserOrder(string email, OrderRequest orderRequest,
            [FromBody]List<OrderDetailRequest> orderDetailRequests)
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                var response = await userOrderBal.CreateTransactionCOD(orderRequest, orderDetailRequests, userID);
                await OrderMailHelper.SendEmail(email, orderRequest, orderDetailRequests);
                return response;
            }
        }

        [HttpPost("CardCheckout")]
        [Authorize]
        public async Task<Response> OnlineCharge(string stripeEmail, string stripeToken, OrderRequest orderRequest,
            [FromBody]List<OrderDetailRequest> orderDetailRequests)
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await userOrderBal.CreateTransactionStripe(stripeEmail, stripeToken, orderRequest,
                    orderDetailRequests, userID);
            }
        }

        [HttpPost("PayPalCheckout")]
        [Authorize]
        public async Task<Response> PayPalCharge(string email, string paypalOrderID, OrderRequest orderRequest,
            [FromBody]List<OrderDetailRequest> orderDetailRequests)
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await userOrderBal.CreateTransactionPayPal(email, paypalOrderID, orderRequest,
                    orderDetailRequests, userID);
            }
        }

        [HttpGet("USDCurrency")]
        public async Task<Response> CurrencyConvertingCrawler()
        {
            var usdCurrency = CurrencyConverterHelper.USDCurrency();
            if (usdCurrency is -1)
            {
                return await Task.FromResult(new Response("Fail", false, 0, null));
            }
            else
            {
                return await Task.FromResult(new Response("Success", true, 1, usdCurrency));
            }
        }

        [HttpGet("CheckCoupon")]
        public async Task<Response> CheckCoupon(string code)
        {
            return await userOrderBal.CheckCoupon(code);
        }

        [HttpPut("DisableCoupon")]
        public async Task<Response> DisableCoupon(string code)
        {
            return await userOrderBal.DisableCoupon(code);
        }
    }
}
