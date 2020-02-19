using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class CartBAL
    {
        private BookStoreContext context;

        public CartBAL()
        {
            context = new BookStoreContext();
        }

        public async Task<Response> GetCart(int userID)
        {
            try
            {
                var cart = await context.Cart.Include(x => x.IdNavigation).Include(x => x.CartBook)
                    .ThenInclude(x => x.Book)
                    .Where(x => x.IdNavigation.Id.Equals(userID)).FirstOrDefaultAsync();
                if (cart is null)
                {
                    return new Response("Can not find a cart for this account!", false, 0, null);
                }
                return new Response("Success", true, 1, cart);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateCart(int userID)
        {
            try
            {
                var cart = new Cart
                {
                    Id = userID,
                    CreatedDate = DateTime.Now
                };
                await context.Cart.AddAsync(cart);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, cart);
                }
                else
                {
                    return new Response("Can not create a cart for this account!", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertToCart(Cart cart, Book book, int quantity)
        {
            try
            {
                var originalID = book.Id.Length < 18 ? book.Id : SecureHelper.GetOriginalInput(book.Id);
                var checkCartBook = await context.CartBook
                    .Where(x => x.BookId.Equals(originalID) && x.CartId.Equals(cart.Id))
                    .FirstOrDefaultAsync();
                if (checkCartBook is null)
                {
                    var cartBook = new CartBook
                    {
                        BookId = book.Id.Length < 18 ? book.Id : SecureHelper.GetOriginalInput(book.Id),
                        CartId = cart.Id,
                        PickedDate = DateTime.Now,
                        Quantity = quantity,
                        SubTotal = book.CurrentPrice
                    };
                    context.CartBook.Add(cartBook);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, cartBook);
                }
                else
                {
                    checkCartBook.Quantity += quantity;
                    checkCartBook.SubTotal += book.CurrentPrice * quantity;
                    context.CartBook.Update(checkCartBook);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, checkCartBook);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertToCartFromSession(Cart cart, Book book, int quantity, int subtotal)
        {
            try
            {
                var originalID = book.Id.Length < 18 ? book.Id : SecureHelper.GetOriginalInput(book.Id);
                var checkCartBook = await context.CartBook.Where(x => x.BookId.Equals(originalID) && x.CartId.Equals(cart.Id))
                    .FirstOrDefaultAsync();
                if (checkCartBook is null)
                {
                    var cartBook = new CartBook
                    {
                        BookId = originalID,
                        CartId = cart.Id,
                        PickedDate = DateTime.Now,
                        Quantity = quantity,
                        SubTotal = subtotal
                    };
                    context.CartBook.Add(cartBook);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, cartBook);
                }
                else
                {
                    checkCartBook.Quantity += quantity;
                    checkCartBook.SubTotal += subtotal;
                    context.CartBook.Update(checkCartBook);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, checkCartBook);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> RemoveFromCart(int cartID, string bookID)
        {
            try
            {
                var cartBook = await context.CartBook.Where(x => x.BookId.Equals(bookID) && x.CartId.Equals(cartID))
                    .FirstOrDefaultAsync();
                context.CartBook.Remove(cartBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, cartBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateQuantity(int cartID, string bookID, int quantity)
        {
            try
            {
                var cartBook = await context.CartBook.Where(x => x.BookId.Equals(bookID) && x.CartId.Equals(cartID))
                    .FirstOrDefaultAsync();
                cartBook.Quantity = quantity;
                cartBook.SubTotal = cartBook.Book.CurrentPrice * quantity;
                context.CartBook.Update(cartBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, cartBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> ResetCart(int cartID)
        {
            try
            {
                var cartBooks = await context.CartBook.Where(x => x.CartId.Equals(cartID)).ToListAsync();
                context.CartBook.RemoveRange(cartBooks);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, cartBooks);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
