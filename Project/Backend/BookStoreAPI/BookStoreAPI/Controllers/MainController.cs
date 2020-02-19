using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : Controller
    {
        private MainBAL mainBal;

        public MainController()
        {
            mainBal = new MainBAL();
        }

        [HttpGet("SessionInfo")]
        public async Task<Response> GetSessionInfo()
        {
            string session = HttpContext.Session.GetString("BookStore");
            if (session is null)
            {
                string cookie =
                    await Task.FromResult<string>(Request.Cookies.Where(x => x.Key.Equals("BookStore")).FirstOrDefault()
                        .Value);
                if (cookie != null)
                {
                    var account = await mainBal.GetAccountByCookie(cookie);
                    if (account.Status is true)
                    {
                        SessionHelper.SetWebsiteSession(HttpContext.Session, cookie);
                        SessionHelper.SetUserSession(HttpContext.Session, (account.Obj as Account).Id,
                            (account.Obj as Account).IdNavigation.FullName);
                        SessionHelper.CreateCartSession(HttpContext.Session);
                        SessionHelper.CreateOrdersSession(HttpContext.Session);
                        //ViewBag.Session = cookie;
                        //ViewBag.UserID = (account.Obj as Account).Id;
                        //ViewBag.FullName = account.Obj as Account is null
                        //    ? null
                        //    : (account.Obj as Account).IdNavigation.FullName;
                        if (account.Obj as Account != null)
                        {
                            //ViewBag.ListSuggestedBooks =
                            //    (await mainBal.GetListSuggestedBooks((account.Obj as Account).Id)).Obj as List<Book>;
                        }
                    }
                }
                else
                {
                    SessionHelper.SetAnonymousWebsiteSession(HttpContext.Session);
                    SessionHelper.CreateCartSession(HttpContext.Session);
                    SessionHelper.CreateOrdersSession(HttpContext.Session);
                }
            }
            else
            {
                //ViewBag.Session = session;
                var account = await mainBal.GetAccountByCookie(session);
                if (account.Status is true)
                {
                    SessionHelper.SetUserSession(HttpContext.Session, (account.Obj as Account).Id,
                        (account.Obj as Account).IdNavigation.FullName);
                }
                //ViewBag.FullName = account.Obj as Account is null
                //    ? null
                //    : (account.Obj as Account).IdNavigation.FullName;
                if (account.Obj as Account != null)
                {
                    //ViewBag.ListSuggestedBooks =
                    //    (await mainBal.GetListSuggestedBooks((account.Obj as Account).Id)).Obj as List<Book>;
                }
            }
            return new Response("Success", true, 1, HttpContext.Session.GetInt32("UserID"));
        }

        [HttpGet("ListCategory")]
        public async Task<Response> GetListCategory()
        {
            return await mainBal.GetListCategory();
        }
        
        [HttpGet("FamousPublisher")]
        public async Task<Response> GetListFamousPublisher()
        {
            return await mainBal.GetListFamousPublisher();
        }

        [HttpGet("List6BestSaleBook")]
        public async Task<Response> GetList6BestSaleBook()
        {
            return await mainBal.GetList6BestSaleBook();
        }

        [HttpGet("List3FeaturedBook")]
        public async Task<Response> GetList3FeaturedBook()
        {
            return await mainBal.GetList3FeaturedBook();
        }

        [HttpGet("ListLowestPriceBook")]
        public async Task<Response> GetListLowestPriceBook()
        {
            return await mainBal.GetListLowestPriceBook();
        }

        //[Authorize]
        [HttpGet("Logout")]
        public async Task<Response> Logout()
        {
            string cookie =
                await Task.FromResult<string>(Request.Cookies.Where(x => x.Key.Equals("BookStore")).FirstOrDefault()
                    .Value);
            if (cookie is null)
            {
                var session = HttpContext.Session.GetString("BookStore");
                SessionHelper.ClearSessionLogout(this.HttpContext.Session);
                return await mainBal.Logout(session);
            }
            else
            {
                Response.Cookies.Delete("BookStore");
                SessionHelper.ClearSessionLogout(this.HttpContext.Session);
                return await mainBal.Logout(cookie);
            }
        }
    }
}
