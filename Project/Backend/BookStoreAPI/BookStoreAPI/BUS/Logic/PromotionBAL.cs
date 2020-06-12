using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class PromotionBAL
    {
        private BookStoreContext context;

        public PromotionBAL()
        {
            context = new BookStoreContext();
        }

        public async Task<Response> GetListPromotion()
        {
            try
            {
                var list = await context.Promotion.Include(x => x.PromotionDetail).ThenInclude(x => x.Book)
                    .ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListCurrentPromotion()
        {
            try
            {
                var list = await context.Promotion.Include(x => x.PromotionDetail).ThenInclude(x => x.Book)
                    .Where(x => x.IsExpired.Equals(1)).OrderBy(x => x.EndedDate).ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetPromotion(int id)
        {
            try
            {
                var response = await context.Promotion.Include(x => x.PromotionDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Id.Equals(id))
                    .FirstOrDefaultAsync();
                return new Response("Success", true, 1, response);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CountPromotion()
        {
            try
            {
                int count = await context.Promotion.CountAsync();
                return new Response("Success", true, 1, count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreatePromotion(Promotion promotion)
        {
            try
            {
                await context.Promotion.AddAsync(promotion);
                int record = await context.SaveChangesAsync();
                if (record is 1)
                {
                    return new Response("Success", true, 1, promotion);
                }
                return new Response("Error when insert this promotion!", false, 0, promotion);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdatePromotion(Promotion promotion)
        {
            try
            {
                var findPromotion = await context.Promotion.Where(x => x.Id.Equals(promotion.Id)).FirstOrDefaultAsync();
                findPromotion.EndedDate = promotion.EndedDate;
                findPromotion.Description = promotion.Description;
                findPromotion.IsExpired = promotion.IsExpired;

                context.Promotion.Update(findPromotion);
                int record = await context.SaveChangesAsync();
                if (record is 1)
                {
                    return new Response("Success", true, 1, findPromotion);
                }
                return new Response("Error when update this promotion!", false, 0, findPromotion);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreatePromotionDetail(PromotionDetail promotionDetail)
        {
            try
            {
                await context.PromotionDetail.AddAsync(promotionDetail);
                int record = await context.SaveChangesAsync();
                if (record is 1)
                {
                    return new Response("Success", true, 1, promotionDetail);
                }
                return new Response("Error when insert this promotion detail!", false, 0, promotionDetail);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdatePromotionDetail(PromotionDetail promotionDetail)
        {
            try
            {
                var findPromotionDetail = await context.PromotionDetail
                    .Where(x => x.PromotionId.Equals(promotionDetail.PromotionId) &&
                                x.BookId.Equals(promotionDetail.BookId)).FirstOrDefaultAsync();

                findPromotionDetail.Discount = promotionDetail.Discount;
                context.PromotionDetail.Update(findPromotionDetail);
                int record = await context.SaveChangesAsync();
                if (record is 1)
                {
                    return new Response("Success", true, 1, findPromotionDetail);
                }
                return new Response("Error when update this promotion detail!", false, 0, findPromotionDetail);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeletePromotionDetail(int promotionID, string bookID)
        {
            try
            {
                var findPromotionDetail = await context.PromotionDetail
                    .Where(x => x.PromotionId.Equals(promotionID) &&
                                x.BookId.Equals(bookID)).FirstOrDefaultAsync();
                context.PromotionDetail.Remove(findPromotionDetail);
                int record = await context.SaveChangesAsync();
                if (record is 1)
                {
                    return new Response("Success", true, 1, findPromotionDetail);
                }
                return new Response("Error when delete this promotion detail!", false, 0, findPromotionDetail);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
