using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class CommentBAL
    {
        private BookStoreContext context;

        public CommentBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetListComment(string bookID)
        {
            try
            {
                var listComment = await context.Comment.Where(x => x.BookId.Equals(bookID)).OrderByDescending(x => x.DateTime)
                    .ToListAsync();
                return new Response("Success", true, listComment.Count, listComment);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Create(Comment comment)
        {
            try
            {
                await context.Comment.AddAsync(comment);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, comment);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Delete(string id)
        {
            try
            {
                var comment = await context.Comment.Where(x => x.Id.Equals(Int32.Parse(id))).FirstOrDefaultAsync();
                context.Comment.Remove(comment);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, comment);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Update(string id, string text)
        {
            try
            {
                var currentComment =
                    await context.Comment.Where(x => x.Id.Equals(Int32.Parse(id))).FirstOrDefaultAsync();
                currentComment.DateTime = DateTime.Now;
                currentComment.Text = text;
                context.Comment.Update(currentComment);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, currentComment);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
