using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class SearchHistoryBAL
    {
        private BookStoreContext context;

        public SearchHistoryBAL()
        {
            context = new BookStoreContext();
        }

        public async Task<Response> GetListSearchHistory(int userID)
        {
            try
            {
                var list = await context.SearchHistory.Where(x => x.UserId.Equals(userID))
                    .OrderByDescending(x => x.DateTime).Take(5).ToListAsync();
                return new Response("Success", true, 1, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateSearchHistory(SearchHistory searchHistory)
        {
            try
            {
                await context.SearchHistory.AddAsync(searchHistory);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, searchHistory);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
