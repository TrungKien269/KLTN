using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class FormBookBAL
    {
        private BookStoreContext context;

        public FormBookBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetListFormBook()
        {
            try
            {
                var list = await context.Form.ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
