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

        public async Task<Response> CheckEmail(string email)
        {
            try
            {
                var subEmail = await context.SubscriptionEmail.Where(x => x.Email.Equals(email)).FirstOrDefaultAsync();
                if (subEmail is null)
                {
                    return new Response("Success", true, 0, email);
                }
                else
                {
                    return new Response("This email has been subcribed", false, 0, email);
                }
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
                var check = await CheckEmail(email.Email);
                if (check.Status is true)
                {
                    await context.SubscriptionEmail.AddAsync(email);
                    var response = await context.SaveChangesAsync();
                    if (response is 1)
                    {
                        return new Response("Success", true, 1, email);
                    }
                    else
                    {
                        return new Response("Can not save this email", false, 0, null);
                    }
                }
                else
                {
                    return check;
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
