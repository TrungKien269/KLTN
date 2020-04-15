using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class UserCartBAL
    {
        private CartBAL cartBal;
        private AccountBAL accountBal;

        public UserCartBAL()
        {
            this.cartBal = new CartBAL();
            this.accountBal = new AccountBAL();
        }

        public async Task<Response> GetCart(int userID)
        {
            return await cartBal.GetCart(userID);
        }

        public async Task<Response> RemoveFromCart(int cartID, string bookID)
        {
            return await cartBal.RemoveFromCart(cartID, bookID);
        }

        public async Task<Response> EditQuantityInCart(int cartID, string bookID, int quantity)
        {
            return await cartBal.UpdateQuantity(cartID, bookID, quantity);
        }

        public async Task<Response> ResetCart(int cartID)
        {
            return await cartBal.ResetCart(cartID);
        }
    }
}
