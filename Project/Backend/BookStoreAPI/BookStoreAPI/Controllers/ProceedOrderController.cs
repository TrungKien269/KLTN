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
            var session = HttpContext.Session.GetString("BookStore");
            var response = await userOrderBal.GetCart(session);
            if (response.Status is false)
            {
                response.Obj = SessionHelper.GetCartSession(HttpContext.Session);
            }
            else
            {
                response.Obj = (response.Obj as Cart).CartBook;
            }
            return response;
        }

        [HttpGet("OrderUserInfo")]
        public async Task<Response> GetOrderUserInfo()
        {
            var session = HttpContext.Session.GetString("BookStore");
            var response = await userOrderBal.GetCart(session);
            if (response.Status is false)
            {
                response.Obj = new Order();
            }
            else
            {
                response.Obj = new Order
                {
                    FullName = (response.Obj as Cart).IdNavigation.FullName,
                    PhoneNumber = (response.Obj as Cart).IdNavigation.PhoneNumber,
                    Address = (response.Obj as Cart).IdNavigation.Address
                };
            }
            return response;
        }
    }
}
