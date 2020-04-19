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
    public class UserCartController : Controller
    {
        private UserCartBAL userCartBal;

        public UserCartController()
        {
            this.userCartBal = new UserCartBAL();
        }

        [Authorize]
        [HttpGet("Cart")]
        public async Task<Response> GetUserCart()
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
                return await userCartBal.GetCart(userID);
            }
        }

        [Authorize]
        [HttpDelete("RemoveBookCart")]
        public async Task<Response> RemoveBookInCart(string id)
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
                var cart = (await userCartBal.GetCart(userID)).Obj as Cart;
                return await userCartBal.RemoveFromCart(cart.Id, id);
            }
        }

        [Authorize]
        [HttpPost("EditQuantityCart")]
        public async Task<Response> EditQuantityBookInCart(string id, string quantity)
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
                var cart = (await userCartBal.GetCart(userID)).Obj as Cart;
                return await userCartBal.EditQuantityInCart(cart.Id, id, int.Parse(quantity));
            }
        }

        [Authorize]
        [HttpDelete("ResetCart")]
        public async Task<Response> ResetCart()
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
                var cart = (await userCartBal.GetCart(userID)).Obj as Cart;
                return await userCartBal.ResetCart(cart.Id);
            }
        }
    }
}
