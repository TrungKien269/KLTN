using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Promotion;

namespace BookStoreAPI.BUS.Logic
{
    public class CRUDPromotionBAL
    {
        private PromotionBAL promotionBal;

        public CRUDPromotionBAL()
        {
            promotionBal = new PromotionBAL();
        }

        public async Task<Response> CreatePromotionProcess(PromotionRequest promotionRequest,
            List<PromotionDetailRequest> promotionDetailRequests)
        {
            try
            {
                var promotion = new Promotion
                {
                    Id = ((await promotionBal.CountPromotion()).Obj as int?).Value + 1,
                    CreatedDate = DateTime.Now,
                    Description = promotionRequest.Description,
                    EndedDate = promotionRequest.EndedDate,
                    IsExpired = 1
                };

                await promotionBal.CreatePromotion(promotion);

                foreach (var request in promotionDetailRequests)
                {
                    var promotionDetail = new PromotionDetail
                    {
                        PromotionId = promotion.Id,
                        BookId = request.BookID,
                        Discount = request.Discount
                    };
                    promotion.PromotionDetail.Add(promotionDetail);
                    await promotionBal.CreatePromotionDetail(promotionDetail);
                }
                return new Response("Success", true, 1, promotion);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
