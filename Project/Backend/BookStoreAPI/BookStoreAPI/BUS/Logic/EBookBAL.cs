using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class EBookBAL
    {
        private BookStoreContext context;

        public EBookBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetListEBook()
        {
            try
            {
                var list = await context.EBook.ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListCategory()
        {
            try
            {
                var list = await context.EBook.GroupBy(x => x.Category).Select(x => new
                {
                    Name = x.Key,
                    NumberBook = x.Count()
                }).OrderBy(x => x.Name).ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetEBook(string id)
        {
            try
            {
                var eBook = await context.EBook.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                return new Response("Success", true, 1, eBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertEBook(EBook eBook)
        {
            try
            {
                await context.EBook.AddAsync(eBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, eBook);
                }
                else
                {
                    return new Response("Can not create this EBook", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateEBook(EBook eBook)
        {
            try
            {
                context.EBook.Update(eBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, eBook);
                }
                else
                {
                    return new Response("Can not update this EBook", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
