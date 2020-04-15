using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class BookInfoController : Controller
    {
        private BookInfoBAL bookInfoBal;

        public BookInfoController()
        {
            this.bookInfoBal = new BookInfoBAL();
        }

        [HttpGet("Book/{id}")]
        public async Task<Response> Index(string id)
        {
            var response = await bookInfoBal.GetBook(id);
            response.previousState = "Book/" + id;
            return response;
        }

        [Authorize]
        [HttpPost("AddToCart")]
        public async Task<Response> AddBookToCart(string id, string quantity)
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
                var cart = (await bookInfoBal.GetCart(userID)).Obj as Cart;
                var currentPrice = ((await bookInfoBal.GetBook(id)).Obj as Book).CurrentPrice;
                return await bookInfoBal.AddToCart(cart.Id, id, currentPrice, int.Parse(quantity));
            }
        }

        [Authorize]
        [HttpPost("RateBook")]
        public async Task<Response> RateBook(string bookID, int point)
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
                var rating = new Rating
                {
                    BookId = bookID,
                    Point = point,
                    DateTime = DateTime.Now,
                    UserId = userID
                };
                return await bookInfoBal.RateBook(rating);
            }
        }

        [HttpGet("RatingInfo")]
        public async Task<Response> RatingInfo(string bookID)
        {
            return await bookInfoBal.GetRatingInfo(bookID);
        }

        [HttpGet("ListComment")]
        public async Task<Response> ListComment(string bookID)
        {
            return await bookInfoBal.GetComment(bookID);
        }

        [Authorize]
        [HttpPost("Comment")]
        public async Task<Response> Comment(string bookID, string text)
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
                var comment = new Comment
                {
                    BookId = bookID,
                    DateTime = DateTime.Now,
                    Text = text,
                    UserId = userID
                };
                return await bookInfoBal.Comment(comment);
            }
        }

        [Authorize]
        [HttpPost("RemoveComment")]
        public async Task<Response> RemoveComment(string id)
        {
            return await bookInfoBal.RemoveComment(id);
        }

        [Authorize]
        [HttpPut("UpdateComment")]
        public async Task<Response> UpdateComment(string id, string text)
        {
            return await bookInfoBal.UpdateComment(id, text);
        }

        [HttpGet("RelatedBook/{id}")]
        public async Task<Response> RelatedBook(string id)
        {
            var httpClient = new HttpClient();
            var listBook = new List<string>();
            var response = httpClient.GetAsync("http://localhost:6000/booksimilarity/" + id);
            string apiResponse = await response.Result.Content.ReadAsStringAsync();
            listBook = JsonConvert.DeserializeObject<List<string>>(apiResponse);
            return await bookInfoBal.GetListRelatedBooks(listBook);
        }
    }
}