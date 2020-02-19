using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class WishListBAL
    {
        private BookStoreContext context;

        public WishListBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetListWisher(int userID)
        {
            try
            {
                var list = await context.WishList.Include(x => x.Book).Where(x => x.UserId.Equals(userID))
                    .ToListAsync();
                return new Response("Success", true, list.Count > 0 ? list.Count : 1, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> AddToWishList(WishList wishlist)
        {
            try
            {
                var check = await context.WishList
                    .Where(x => x.UserId.Equals(wishlist.UserId) && x.BookId.Equals(wishlist.BookId))
                    .FirstOrDefaultAsync();
                if (check is null)
                {
                    await context.WishList.AddAsync(wishlist);
                    await context.SaveChangesAsync();
                }
                return new Response("Success", true, 1, wishlist);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> RemoveFromWishList(int userID, string bookID)
        {
            try
            {
                var wishlist = await context.WishList.Where(x => x.BookId.Equals(bookID) && x.UserId.Equals(userID))
                    .FirstOrDefaultAsync();
                context.WishList.Remove(wishlist);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, wishlist);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
