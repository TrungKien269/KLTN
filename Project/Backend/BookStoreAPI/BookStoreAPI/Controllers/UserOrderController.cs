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
            int userID = HttpContext.Session.GetInt32("UserID").Value;
            return await userOrderBal.GetListProcessing(userID);
        }

        [Authorize]
        [HttpGet("ListDelivery")]
        public async Task<Response> GetListDelivery()
        {
            int userID = HttpContext.Session.GetInt32("UserID").Value;
            return await userOrderBal.GetListDelivery(userID);
        }

        [Authorize]
        [HttpGet("ListDelivered")]
        public async Task<Response> GetListDelivered()
        {
            int userID = HttpContext.Session.GetInt32("UserID").Value;
            return await userOrderBal.GetListDelivered(userID);
        }

        [Authorize]
        [HttpGet("ListCanceled")]
        public async Task<Response> GetListCanceled()
        {
            int userID = HttpContext.Session.GetInt32("UserID").Value;
            return await userOrderBal.GetListCanceled(userID);
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
