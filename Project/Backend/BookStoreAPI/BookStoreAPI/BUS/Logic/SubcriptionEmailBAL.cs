using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class SubcriptionEmailBAL
    {
        private BookStoreContext context;

        public SubcriptionEmailBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GeteListEmail()
        {
            try
            {
                var list = await context.SubscriptionEmail.ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertEmail(SubscriptionEmail email)
        {
            try
            {
                await context.SubscriptionEmail.AddAsync(email);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, email);
                }
                else
                {
                    return new Response("Can not save this email", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
