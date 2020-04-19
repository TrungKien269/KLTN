using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class FaceBookAccountBAL
    {
        private BookStoreContext context;

        public FaceBookAccountBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> CheckAccount(string facebookID)
        {
            try
            {
                var response = await context.FaceBookAccount.Where(x => x.FaceBookId.Equals(facebookID))
                    .FirstOrDefaultAsync();
                if (response is null)
                {
                    return new Response("No information", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, response);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> SaveAccount(FaceBookAccount faceBookAccount)
        {
            try
            {
                await context.FaceBookAccount.AddAsync(faceBookAccount);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, faceBookAccount);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
