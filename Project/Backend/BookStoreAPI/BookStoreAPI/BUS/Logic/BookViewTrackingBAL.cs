using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Logic
{
    public class BookViewTrackingBAL
    {
        private BookStoreContext context;

        public BookViewTrackingBAL()
        {
            context = new BookStoreContext();
        }

        public async Task<Response> CreateTracking(BookViewTracking tracking)
        {
            try
            {
                await context.BookViewTracking.AddAsync(tracking);
                var response = await context.SaveChangesAsync();
                if (response is 1)
                {
                    return new Response("Success", true, 1, tracking);
                }
                else
                {
                    return new Response("Error when tracking", false, 0, tracking);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
