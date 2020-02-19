using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
                    var hash = await Task.FromResult<string>(
                        CryptographyHelper.GenerateHash(username + DateTime.Now.ToString(),
                            (response.Obj as Account).Salt));
                    response.Token = JWTHelper.CreateAdminToken();
                    SessionHelper.SetAdminSession(this.HttpContext.Session, hash);
                    return response;
                }
                else
                {
                    var hash = await Task.FromResult<string>(
                        CryptographyHelper.GenerateHash(username + DateTime.Now.ToString(),
                            (response.Obj as Account).Salt));
                    SessionHelper.SetWebsiteSession(this.HttpContext.Session, hash);
                    SessionHelper.SetUserSession(this.HttpContext.Session, (response.Obj as Account).Id,
                        (response.Obj as Account).IdNavigation.FullName);
                    CookieHelper.SetWebsiteCookie(this.Response, hash);
                    await loginBal.SetCookieForAccount(hash, response.Obj as Account);
                    if (response.Status is true)
                    {
                        response.Token = JWTHelper.CreateUserToken();
                    }
                    return response;
                }
            }
            return response;
        }

        [HttpPost("Signup")]
        [ValidateAntiForgeryToken]
        public async Task<Response> Signup([FromForm] User user)
        {
            var response = await loginBal.Signup(user);
            if (response.Status is true)
            {
                var hash = await Task.FromResult<string>(
                    CryptographyHelper.GenerateHash(user.Account.Username + DateTime.Now.ToString(),
                        (response.Obj as User).Account.Salt));
                CookieHelper.SetWebsiteCookie(this.Response, hash);
                await loginBal.SetCookieForAccount(hash, (response.Obj as User).Account);
                return response;
            }
            else
            {
                return response;
            }
        }
    }
}
