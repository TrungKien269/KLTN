﻿using System;
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
    public class MainController : Controller
    {
        private MainBAL mainBal;

        public MainController()
        {
            mainBal = new MainBAL();
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

        [Authorize]
        [HttpGet("SearchHistory")]
        public async Task<Response> GetListSearchHistory()
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
                return await mainBal.GetListSearchHistory(userID);
            }
        }

        [Authorize]
        [HttpPost("SaveSearch")]
        public async Task<Response> SaveSearch(string words)
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
                var searchHistory = new SearchHistory
                {
                    UserId = userID, 
                    DateTime = DateTime.Now, 
                    Words = words
                };
                return await mainBal.CreateSearchHistory(searchHistory);
            }
        }

        [Authorize]
        [HttpPost("SaveTracking")]
        public async Task<Response> SaveTracking(string bookID)
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
                var tracking = new BookViewTracking
                {
                    BookId = bookID,
                    UserId = userID,
                    DateTime = DateTime.Now
                };
                return await mainBal.CreateTracking(tracking);
            }
        }
    }
}
