using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class PublisherBAL
    {
        private BookStoreContext context;

        public PublisherBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetFamousList()
        {
            try
            {
                var task = await context.FamousPublisher.ToListAsync();
                return new Response("Success", true, 1, task);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListPublishers()
        {
            try
            {
                var task = await context.Publisher.ToListAsync();
                return new Response("Success", true, 1, task);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
