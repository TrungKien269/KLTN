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
    public class UserWishListController : Controller
    {
        private UserWishListBAL userWishListBal;

        public UserWishListController()
        {
            userWishListBal = new UserWishListBAL();
        }

        [Authorize]
        [HttpGet("UserWishList")]
        public async Task<Response> GetUserWishList()
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
                return await userWishListBal.GetListWisher(userID);
            }
        }

        [Authorize]
        [HttpPost("AddToWishList")]
        public async Task<Response> AddToWishList(string bookID)
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
                var wishlist = new WishList
                {
                    UserId = userID,
                    DateTime = DateTime.Now,
                    BookId = bookID
                };
                return await userWishListBal.AddToWishList(wishlist);
            }
        }

        [Authorize]
        [HttpDelete("RemoveFromWishList")]
        public async Task<Response> RemoveFromWishList(string bookID)
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
                return await userWishListBal.RemoveFromWishList(userID, bookID);
            }
        }
    }
}
