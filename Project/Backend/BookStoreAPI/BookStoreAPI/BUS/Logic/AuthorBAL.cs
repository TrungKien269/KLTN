using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class AuthorBAL
    {
        private BookStoreContext context;

        public AuthorBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> InsertAuthor(Author author)
        {
            try
            {
                var auth = await context.Author
                    .Where(x => x.Name.Equals(author.Name, StringComparison.CurrentCultureIgnoreCase))
                    .FirstOrDefaultAsync();
                if (auth is null)
                {
                    var id = await context.Author.CountAsync();
                    author.Id = id + 1;
                    await context.Author.AddAsync(author);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, author);
                }
                else
                {
                    return new Response("This author has been in this system data!", false, 1, auth);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
