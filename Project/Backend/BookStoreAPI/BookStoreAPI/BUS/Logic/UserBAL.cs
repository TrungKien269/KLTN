using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class UserBAL
    {
        private BookStoreContext context;

        public UserBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetUser(int id)
        {
            try
            {
                if (id.Equals(-1))
                {
                    return await Task.FromResult<Response>(new Response("Cannot find an account!", false, 0, null));
                }
                else
                {
                    var user = await context.User.Include(x => x.Account).Where(x => x.Id.Equals(id))
                        .FirstOrDefaultAsync();
                    return new Response("Success", true, 1, user);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetUserOnly(int id)
        {
            try
            {
                if (id.Equals(-1))
                {
                    return await Task.FromResult<Response>(new Response("Cannot find an account!", false, 0, null));
                }
                else
                {
                    var user = await context.User.Where(x => x.Id.Equals(id))
                        .FirstOrDefaultAsync();
                    return new Response("Success", true, 1, user);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Create(User user)
        {
            try
            {
                await context.User.AddAsync(user);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, user);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Delete(User user)
        {
            context.User.Remove(user);
            await context.SaveChangesAsync();
            return new Response("Success", false, 1, null);
        }

        public async Task<Response> Update(User user)
        {
            try
            {
                context.User.Update(user);
                var check = await context.SaveChangesAsync();
                return new Response("Success", true, 1, user);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetNextID()
        {
            try
            {
                var count = await context.User.CountAsync();
                return new Response("Success", true, 1, count + 1);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
