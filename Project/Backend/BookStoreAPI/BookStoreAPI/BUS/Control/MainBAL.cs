using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class MainBAL
    {
        private BookBAL bookBal;
        private CategoryBAL categoryBal;
        private AccountBAL accountBal;
        private PublisherBAL publisherBal;
        private UserBAL UserBal;

        public MainBAL()
        {
            bookBal = new BookBAL();
            this.categoryBal = new CategoryBAL();
            this.accountBal = new AccountBAL();
            publisherBal = new PublisherBAL();
            this.UserBal = new UserBAL();
        }

        public async Task<Response> GetListCategory()
        {
            return await categoryBal.GetList();
        }

        public async Task<Response> GetListLowestPriceBook()
        {
            return await bookBal.GetListLowestPriceBook();
        }

        public async Task<Response> GetList3FeaturedBook()
        {
            return await bookBal.GetList3FeaturedBook();
        }

        public async Task<Response> GetList6BestSaleBook()
        {
            return await bookBal.GetList6BestSaleBook();
        }

        public async Task<Response> GetListSubCategory(string category)
        {
            return await categoryBal.GetSubList(category);
        }

        public async Task<Response> GetListFamousPublisher()
        {
            return await publisherBal.GetFamousList();
        }

        public async Task<Response> GetListBookFromFamousPublisher(string id)
        {
            return await bookBal.GetBookFromFamousPublisher(id);
        }

        public async Task<Response> GetAccountByCookie(string cookie)
        {
            return await accountBal.GetAccountByCookie(cookie);
        }

        public async Task<Response> Logout(string cookie)
        {
            var account = await accountBal.GetAccountByCookie(cookie);
            if (account is null)
            {
                return await Task.FromResult(new Response("Success", true, 0, null));
            }
            return await accountBal.SetCookie(null, account.Obj as Account);
        }

        public async Task<Response> GetUser(int id)
        {
            return await UserBal.GetUser(id);
        }

        //public async Task<Response> GetListSuggestedBooks(int userID)
        //{
        //    var relatedList = PythonHelper.GetSuggestedBooks(userID);
        //    return await bookBal.GetListSuggestedBooks(relatedList);
        //}
    }
}
