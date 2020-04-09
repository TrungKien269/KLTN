using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
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
            var userID = HttpContext.Session.GetInt32("UserID");
            return await userWishListBal.GetListWisher(userID.Value);
        }

        [Authorize]
        [HttpPost("AddToWishList")]
        public async Task<Response> AddToWishList(string bookID)
        {
            var userID = HttpContext.Session.GetInt32("UserID");
            var wishlist = new WishList
            {
                UserId = userID.Value,
                DateTime = DateTime.Now,
                BookId = bookID
            };
            return await userWishListBal.AddToWishList(wishlist);
        }

        [Authorize]
        [HttpDelete("RemoveFromWishList")]
        public async Task<Response> RemoveFromWishList(string bookID)
        {
            var userID = HttpContext.Session.GetInt32("UserID");
            return await userWishListBal.RemoveFromWishList(userID.Value, bookID);
        }
    }
}
