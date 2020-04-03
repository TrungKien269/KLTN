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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            //HttpContext.Session.SetString("PreviousState", "Book/" + id);
            response.previousState = "Book/" + id;
            return response;
        }

        [Authorize]
        [HttpPost("AddToCart")]
        public async Task<Response> AddBookToCart(string id, string quantity)
        {
            var userID = HttpContext.Session.GetInt32("UserID");
            if (userID is null)
            {
                try
                {
                    var originalID = SecureHelper.GetOriginalInput(id);
                    var book = (await bookInfoBal.GetBookWithoutDetail(originalID)).Obj as Book;
                    var listCartBook = SessionHelper.GetCartSession(this.HttpContext.Session);
                    var index = listCartBook.FindIndex(x => x.BookId.Equals(originalID));
                    if (index >= 0)
                    {
                        listCartBook[index].Quantity += int.Parse(quantity);
                        listCartBook[index].SubTotal += book.CurrentPrice * int.Parse(quantity);
                    }
                    else
                    {
                        listCartBook.Add(new CartBook
                        {
                            BookId = originalID,
                            Quantity = int.Parse(quantity),
                            SubTotal = int.Parse(quantity) * book.CurrentPrice,
                            PickedDate = DateTime.Now,
                            Book = book
                        });
                    }
                    SessionHelper.SetCartSession(this.HttpContext.Session, listCartBook);
                    return await Task.FromResult<Response>(new Response("Success", true, 1, listCartBook));
                }
                catch (Exception e)
                {
                    return Models.Response.CatchError(e.Message);
                }

            }
            else
            {
                var cart = (await bookInfoBal.GetCart(int.Parse(userID.ToString()))).Obj as Cart;
                if (cart is null)
                {
                    var newCart_Response = await bookInfoBal.CreateCart(int.Parse(userID.ToString()));
                    Cart newCart = newCart_Response.Obj as Cart;
                    var originalID = SecureHelper.GetOriginalInput(id);
                    var book = (await bookInfoBal.GetBook(originalID)).Obj as Book;
                    await bookInfoBal.AddToCart(newCart, book, int.Parse(quantity));
                    return new Response("Success", true, 1, newCart.CartBook);
                }
                else
                {
                    var originalID = SecureHelper.GetOriginalInput(id);
                    var book = (await bookInfoBal.GetBook(originalID)).Obj as Book;
                    await bookInfoBal.AddToCart(cart, book, int.Parse(quantity));
                    return new Response("Success", true, 1, cart.CartBook);
                }
            }
        }

        [Authorize]
        [HttpPost("RateBook")]
        public async Task<Response> RateBook(string bookID, int point)
        {
            var userID = HttpContext.Session.GetInt32("UserID");
            var rating = new Rating
            {
                BookId = bookID,
                Point = point,
                DateTime = DateTime.Now,
                UserId = userID.Value
            };
            return await bookInfoBal.RateBook(rating);
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
            var userID = HttpContext.Session.GetInt32("UserID");
            var comment = new Comment
            {
                BookId = bookID,
                DateTime = DateTime.Now,
                Text = text,
                UserId = userID.Value
            };
            return await bookInfoBal.Comment(comment);
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
            var response = httpClient.GetAsync("http://localhost:5000/booksimilarity/" + id);
            string apiResponse = await response.Result.Content.ReadAsStringAsync();
            listBook = JsonConvert.DeserializeObject<List<string>>(apiResponse);
            return await bookInfoBal.GetListRelatedBooks(listBook);
        }
    }
}