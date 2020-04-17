using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Request;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class LoginController : Controller
    {
        private LoginBAL loginBal;

        public LoginController()
        {
            this.loginBal = new LoginBAL();
        }

        [HttpPost("Signin")]
        public async Task<Response> Login(string username, string password)
        {
            var response = await loginBal.Login(username, password);
            if (response.Status == true)
            {
                if ((response.Obj as Account).Username.Equals("admin"))
                {
                    response.Token = JWTHelper.CreateAdminToken();
                    return response;
                }
                else
                {
                    if (response.Status is true)
                    {
                        response.Token = JWTHelper.CreateUserToken((response.Obj as Account).Id);
                    }
                    return response;
                }
            }
            return response;
        }

        [HttpPost("GoogleSignin")]
        public async Task<Response> GoogleSignin(string email)
        {
            var response = await loginBal.LoginByGoogle(email);
            if (response.Status is true)
            {
                response.Token = JWTHelper.CreateUserToken((response.Obj as Account).Id);
                return response;
            }
            return response;
        }

        [HttpPost("Signup")]
        public async Task<Response> Signup(UserRequest userRequest)
        {
            var account = new Account
            {
                Username = userRequest.AccountRequest.Username,
                Password = userRequest.AccountRequest.Password,
                Email = userRequest.AccountRequest.Email
            };

            var user = new User
            {
                FullName = userRequest.FullName,
                Gender = userRequest.Gender,
                Birthday = userRequest.Birthday,
                PhoneNumber = userRequest.PhoneNumber,
                Address = userRequest.Address,
                Account = account
            };

            var response = await loginBal.Signup(user);
            if (response.Status is true)
            {
                response.Token = JWTHelper.CreateUserToken((response.Obj as User).Id);
                return response;
            }
            else
            {
                return response;
            }
        }
    }
}
