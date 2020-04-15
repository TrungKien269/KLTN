using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class UserOrderController : Controller
    {
        private UserOrderBAL userOrderBal;

        public UserOrderController()
        {
            userOrderBal = new UserOrderBAL();
        }

        [HttpGet("AnonymousOrder")]
        public async Task<Response> Anonymous()
        {
            HttpContext.Session.SetString("PreviousState", "AnonymousOrder");
            var response = new Response();
            response.Obj = await Task.FromResult<List<Order>>(SessionHelper.GetOrdersSession(HttpContext.Session));
            return response;
        }

        [Authorize]
        [HttpGet("ListProcessing")]
        public async Task<Response> GetListProcessing()
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
                return await userOrderBal.GetListProcessing(userID);
            }
        }

        [Authorize]
        [HttpGet("ListDelivery")]
        public async Task<Response> GetListDelivery()
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
                return await userOrderBal.GetListDelivery(userID);
            }
        }

        [Authorize]
        [HttpGet("ListDelivered")]
        public async Task<Response> GetListDelivered()
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
                return await userOrderBal.GetListDelivered(userID);
            }
        }

        [Authorize]
        [HttpGet("ListCanceled")]
        public async Task<Response> GetListCanceled()
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
                return await userOrderBal.GetListCanceled(userID);
            }
        }

        [Authorize]
        [HttpPost("CancelOrder")]
        public async Task<Response> CancelOrder(string id)
        {
            var order = (await userOrderBal.GetOrder(id)).Obj as Order;
            var newOrder = await userOrderBal.UpdateStatus(order, "Canceled");
            return new Response("Sucess", true, 1, newOrder.Obj as Order);
        }
    }
}
