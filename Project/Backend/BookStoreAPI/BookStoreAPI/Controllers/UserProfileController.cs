using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
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
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await profileBal.GetUserInfo(userID);
            }
        }

        [Authorize]
        [HttpPut("UpdateProfile")]
        public async Task<Response> UpdateUser(UserRequest userRequest)
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
                var user = new User
                {
                    FullName = userRequest.FullName,
                    Gender = userRequest.Gender,
                    Birthday = userRequest.Birthday,
                    PhoneNumber = userRequest.PhoneNumber,
                    Address = userRequest.Address
                };
                user.Id = userID;
                return await profileBal.UpdateUser(user);
            }
        }

        [Authorize]
        [HttpPost("CheckPassword")]
        public async Task<Response> CheckPassword(string current_password)
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
                var account = await profileBal.GetAccountInfo(userID);
                return await profileBal.CheckCurrentPassword(account.Obj as Account, current_password);
            }
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<Response> ChangePassword(string new_password)
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
                var account = await profileBal.GetAccountInfo(userID);
                return await profileBal.ChangePassword(account.Obj as Account, new_password);
            }
        }
    }
}
