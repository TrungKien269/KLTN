using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class RawBookBAL
    {
        private BookStoreContext context;

        public RawBookBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> Insert(RawBook rawBook)
        {
            try
            {
                await context.RawBook.AddAsync(rawBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, rawBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Update(RawBook rawBook)
        {
            try
            {
                var findBook = await context.RawBook.Where(x => x.Id.Equals(rawBook.Id)).FirstOrDefaultAsync();
                findBook.Author = rawBook.Author;
                findBook.Form = rawBook.Form;
                findBook.Image = rawBook.Image;
                findBook.Name = rawBook.Name;
                findBook.NumOfPage = rawBook.NumOfPage;
                findBook.Price = rawBook.Price;
                findBook.Publisher = rawBook.Publisher;
                findBook.ReleaseYear = rawBook.ReleaseYear;
                findBook.Summary = rawBook.Summary;
                findBook.Supplier = rawBook.Supplier;

                context.RawBook.Update(findBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, findBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
