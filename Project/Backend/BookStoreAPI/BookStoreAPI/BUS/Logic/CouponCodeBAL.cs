using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class CouponCodeBAL
    {
        private BookStoreContext context;

        public CouponCodeBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetCoupon(float value)
        {
            try
            {
                var coupon = await context.CouponCode
                    .Where(x => x.Value.Equals(value) && x.State.Equals(1) && x.Sended.Equals(0))
                    .FirstOrDefaultAsync();
                if (coupon is null)
                {
                    return new Response("Empty", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, coupon);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CheckCoupon(string code)
        {
            try
            {
                var coupon = await context.CouponCode.Where(x => x.Id.Equals(code)).FirstOrDefaultAsync();
                if (coupon is null)
                {
                    return new Response("This coupon code is wrong!", false, 0, null);
                }
                else
                {
                    if (coupon.State.Equals(1))
                    {
                        return new Response("Success", true, 1, coupon);
                    }
                    else
                    {
                        return new Response("This coupon has been used!", false, 0, null);
                    }
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DisableCoupon(string code)
        {
            try
            {
                var coupon = await context.CouponCode.Where(x => x.Id.Equals(code)).FirstOrDefaultAsync();
                coupon.State = 0;
                context.CouponCode.Update(coupon);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, coupon);
                }
                else
                {
                    return new Response("Fail!", false, 0, coupon);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateCouponSended(string code)
        {
            try
            {
                var coupon = await context.CouponCode.Where(x => x.Id.Equals(code)).FirstOrDefaultAsync();
                coupon.Sended = 1;
                context.CouponCode.Update(coupon);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, coupon);
                }
                else
                {
                    return new Response("Fail!", false, 0, coupon);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> TransactionSendCoupon(float value, int userID)
        {
            try
            {
                var transaction = await context.Database.BeginTransactionAsync();
                var couponResponse = await GetCoupon(value);
                if (couponResponse.Status)
                {
                    var updateSended = await UpdateCouponSended((couponResponse.Obj as CouponCode).Id);
                    var emailResponse = await CouponCodeEmailHelper.SendEmail(couponResponse.Obj as CouponCode, userID);
                    if (emailResponse.Status)
                    {
                        transaction.Commit();
                        return updateSended;
                    }
                    else
                    {
                        transaction.Rollback();
                        return emailResponse;
                    }
                }
                else
                {
                    transaction.Rollback();
                    return couponResponse;
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListCouponValue()
        {
            try
            {
                var list = await context.CouponCode.Where(x => x.Sended.Equals(0) && x.State.Equals(1))
                    .GroupBy(x => x.Value).Select(x => new
                    {
                        Value = x.Key,
                        Amount = x.Count()
                    }).ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
