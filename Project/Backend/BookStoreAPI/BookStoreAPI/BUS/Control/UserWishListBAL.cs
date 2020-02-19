using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class UserWishListBAL
    {
        private WishListBAL wishListBal;

        public UserWishListBAL()
        {
            wishListBal = new WishListBAL();
        }

        public async Task<Response> GetListWisher(int userID)
        {
            return await wishListBal.GetListWisher(userID);
        }

        public async Task<Response> AddToWishList(WishList wishlist)
        {
            return await wishListBal.AddToWishList(wishlist);
        }

        public async Task<Response> RemoveFromWishList(int userID, string bookID)
        {
            return await wishListBal.RemoveFromWishList(userID, bookID);
        }
    }
}
