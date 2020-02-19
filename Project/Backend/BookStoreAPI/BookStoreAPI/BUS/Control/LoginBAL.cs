using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Http;

namespace BookStoreAPI.BUS.Control
{
    public class LoginBAL
    {
        private AccountBAL accountBal;
        private UserBAL userBal;
        private CartBAL cartBal;

        public LoginBAL()
        {
            this.accountBal = new AccountBAL();
            this.userBal = new UserBAL();
            this.cartBal = new CartBAL();
        }

        public async Task<Response> Login(string username, string password)
        {
            return await accountBal.Login(username, password);
        }

        public async Task<Response> SetCookieForAccount(string cookie, Account account)
        {
            return await accountBal.SetCookie(cookie, account);
        }

        public async Task<Response> Signup(User user)
        {
            user = await SettingFullFields(user);
            var checkAccount = await accountBal.CheckAccount(user.Account);
            if (checkAccount.Status is true)
            {
                var checkCreateUser = await this.userBal.Create(user);
                return checkCreateUser;
            }
            else
            {
                return checkAccount;
            }
        }

        public async Task<User> SettingFullFields(User user)
        {
            var nextID = int.Parse((await userBal.GetNextID()).Obj.ToString());
            user.Id = nextID;
            user.Account.Id = nextID;
            string salt = CryptographyHelper.CreateSalt(32);
            user.Account.Salt = salt;
            user.Account.Password = CryptographyHelper.GenerateHash(user.Account.Password, salt);
            user.Account.CreatedDateTime = DateTime.Now;
            user.Account.Cookie = null;
            return await Task.FromResult<User>(user);
        }

        public async Task<Response> SetCartAfterLogin(ISession session, int userID)
        {
            var ListCartBook = SessionHelper.GetCartSession(session);
            var cart = await cartBal.GetCart(userID);
            if (cart.Status is true)
            {
                foreach (var cartbook in ListCartBook)
                {
                    await cartBal.InsertToCartFromSession(cart.Obj as Cart, cartbook.Book, cartbook.Quantity,
                        cartbook.SubTotal);
                }
                SessionHelper.ResetCartSession(session, ListCartBook);
                return cart;
            }
            else
            {
                var newCart_Response = await cartBal.CreateCart(int.Parse(userID.ToString()));
                Cart newCart = newCart_Response.Obj as Cart;
                foreach (var cartbook in ListCartBook)
                {
                    await cartBal.InsertToCartFromSession(newCart, cartbook.Book, cartbook.Quantity,
                        cartbook.SubTotal);
                }
                SessionHelper.ResetCartSession(session, ListCartBook);
                return newCart_Response;
            }
        }
    }
}
