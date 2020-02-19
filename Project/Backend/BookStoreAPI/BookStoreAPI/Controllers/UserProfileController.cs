using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private UserProfileBAL profileBal;

        public UserProfileController()
        {
            profileBal = new UserProfileBAL();
        }

        [Authorize]
        [HttpGet("Profile")]
        public async Task<Response> GetProfile()
        {
            //ViewBag.FullName = HttpContext.Session.GetString("UserFullName");
            var userID = HttpContext.Session.GetInt32("UserID").Value;
            return await profileBal.GetUserInfo(userID);
        }

        [Authorize]
        [HttpPut("UpdateProfile")]
        public async Task<Response> UpdateUser(User user)
        {
            user.Id = HttpContext.Session.GetInt32("UserID").Value;
            return await profileBal.UpdateUser(user);
        }
        
        [HttpPost("CheckPassword")]
        public async Task<Response> CheckPassword(string current_password)
        {
            var session = HttpContext.Session.GetString("BookStore");
            var account = await profileBal.GetAccountInfo(session);
            return await profileBal.CheckCurrentPassword(account.Obj as Account, current_password);
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<Response> ChangePassword(string new_password)
        {
            var session = HttpContext.Session.GetString("BookStore");
            var account = await profileBal.GetAccountInfo(session);
            return await profileBal.ChangePassword(account.Obj as Account, new_password);
        }
    }
}
