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
        private UserBAL userBal;
        private OrderBAL orderBal;
        private BookBAL bookBal;

        public ProceedOrderBAL()
        {
            this.cartBal = new CartBAL();
            this.userBal = new UserBAL();
            this.orderBal = new OrderBAL();
            this.bookBal = new BookBAL();
        }

        public async Task<Response> GetCart(int userID)
        {
            return await cartBal.GetCart(userID);
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

        public async Task<Response> GetUser(int userID)
        {
            return await userBal.GetUser(userID);
        }
    }
}
