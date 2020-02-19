using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class BookInfoBAL
    {
        private BookBAL bookBal;
        private CartBAL cartBal;
        private CategoryBAL categoryBal;
        private CommentBAL commentBal;

        public BookInfoBAL()
        {
            this.bookBal = new BookBAL();
            this.cartBal = new CartBAL();
            this.categoryBal = new CategoryBAL();
            this.commentBal = new CommentBAL();
        }

        public async Task<Response> GetListCategory()
        {
            return await categoryBal.GetList();
        }

        public async Task<Response> GetBook(string id)
        {
            return await bookBal.GetObject(id);
        }

        public async Task<Response> GetBookWithSecureID(string id)
        {
            return await bookBal.GetBookWithSecureID(id);
        }

        public async Task<Response> GetBookWithoutDetail(string id)
        {
            return await bookBal.GetBookOnly(id);
        }

        public async Task<Response> GetCart(int userID)
        {
            return await cartBal.GetCart(userID);
        }

        public async Task<Response> CreateCart(int userID)
        {
            return await cartBal.CreateCart(userID);
        }

        public async Task<Response> AddToCart(Cart cart, Book book, int quantity)
        {
            return await cartBal.InsertToCart(cart, book, quantity);
        }

        public async Task<Response> RateBook(Rating rating)
        {
            return await bookBal.RateBook(rating);
        }

        public async Task<Response> GetRatingInfo(string bookID)
        {
            return await bookBal.GetRatingInfo(bookID);
        }

        public async Task<Response> GetComment(string bookID)
        {
            return await commentBal.GetListComment(bookID);
        }

        public async Task<Response> Comment(Comment comment)
        {
            return await commentBal.Create(comment);
        }

        public async Task<Response> RemoveComment(string id)
        {
            return await commentBal.Delete(id);
        }

        public async Task<Response> UpdateComment(string id, string text)
        {
            return await commentBal.Update(id, text);
        }

        //public async Task<Response> GetListRelatedBooks(string id)
        //{
        //    var relatedList = PythonHelper.GetRelatedBooks(id);
        //    return await bookBal.GetListRelatedBooks(relatedList);
        //}
    }
}
