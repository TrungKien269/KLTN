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
        public async Task<Response> CreateUserOrder(OrderRequest orderRequest,
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
                return await userOrderBal.CreateOrderProcess(orderRequest, orderDetailRequests, userID);
            }
        }
    }
}
