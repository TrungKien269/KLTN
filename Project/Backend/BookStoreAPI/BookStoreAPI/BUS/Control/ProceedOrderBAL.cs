using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class ProceedOrderBAL
    {
        private CartBAL cartBal;
        private AccountBAL accountBal;
        private OrderBAL orderBal;
        private BookBAL bookBal;

        public ProceedOrderBAL()
        {
            this.cartBal = new CartBAL();
            this.accountBal = new AccountBAL();
            this.orderBal = new OrderBAL();
            this.bookBal = new BookBAL();
        }

        public async Task<Response> GetCart(string cookie)
        {
            var response_Account = await accountBal.GetAccountByCookie(cookie);
            if (response_Account.Status is true)
            {
                return await cartBal.GetCart((response_Account.Obj as Account).Id);
            }
            else
            {
                return new Response("Cannot recognize an account!", false, 0, null);
            }
        }

        public async Task<Response> ResetCart(int cartID)
        {
            return await cartBal.ResetCart(cartID);
        }

        public async Task<Response> CountOrder()
        {
            return await orderBal.CountOrder();
        }

        public async Task<Response> CreateOrder(Order order)
        {
            return await orderBal.CreateOrder(order);
        }

        public async Task<Response> GetBook(string bookID)
        {
            return await bookBal.GetBookOnly(bookID);
        }
    }
}
