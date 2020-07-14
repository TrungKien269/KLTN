using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class BookNumberBAL
    {
        private BookStoreContext context;

        public BookNumberBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> CreateBookNumber(string bookID)
        {
            try
            {
                var bookNumber = new BookNumber()
                {
                    BookId = bookID,
                    Amount = 0
                };

                await context.BookNumber.AddAsync(bookNumber);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, bookNumber);
                }
                else
                {
                    return new Response("Create fail!", false, 0, bookNumber);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertNumberForBook(string bookID, int amount)
        {
            try
            {
                var book = await context.BookNumber.Where(x => x.BookId.Equals(bookID)).FirstOrDefaultAsync();
                if (book is null)
                {
                    var bookNumber = new BookNumber()
                    {
                        BookId = bookID,
                        Amount = amount
                    };

                    await context.BookNumber.AddAsync(bookNumber);
                    var check = await context.SaveChangesAsync();
                    if (check is 1)
                    {
                        return new Response("Success", true, 1, bookNumber);
                    }
                    else
                    {
                        return new Response("Insert fail!", false, 0, bookNumber);
                    }
                }
                else
                {
                    book.Amount = book.Amount + amount;
                    context.BookNumber.Update(book);
                    var check = await context.SaveChangesAsync();
                    if (check is 1)
                    {
                        return new Response("Success", true, 1, book);
                    }
                    else
                    {
                        return new Response("Update fail!", false, 0, book);
                    }
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateNumberForBook(string bookID, int amount)
        {
            try
            {
                var book = await context.BookNumber.Where(x => x.BookId.Equals(bookID)).FirstOrDefaultAsync();
                book.Amount = book.Amount - amount;
                if (book.Amount <= 0)
                {
                    book.Amount = 0;
                }
                context.BookNumber.Update(book);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, book);
                }
                else
                {
                    return new Response("Update fail!", false, 0, book);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
