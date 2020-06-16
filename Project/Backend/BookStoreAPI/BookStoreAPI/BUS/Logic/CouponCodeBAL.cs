using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                var coupon = await context.CouponCode.Where(x => x.Value.Equals(value) && x.State.Equals(1))
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
    }
}
