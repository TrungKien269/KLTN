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
    public class EBookBAL
    {
        private BookStoreContext context;

        public EBookBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetListEBook()
        {
            try
            {
                var list = await context.EBook.ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListCategory()
        {
            try
            {
                var list = await context.EBook.GroupBy(x => x.Category).Select(x => new
                {
                    Name = x.Key,
                    NumberBook = x.Count()
                }).OrderBy(x => x.Name).ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetEBook(string id)
        {
            try
            {
                var eBook = await context.EBook.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                return new Response("Success", true, 1, eBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertEBook(EBook eBook)
        {
            try
            {
                await context.EBook.AddAsync(eBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, eBook);
                }
                else
                {
                    return new Response("Can not create this EBook", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateEBook(EBook eBook)
        {
            try
            {
                context.EBook.Update(eBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, eBook);
                }
                else
                {
                    return new Response("Can not update this EBook", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListEBookRentalPolicy()
        {
            try
            {
                var list = await context.EbookRentalPolicy.ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetEBookRentalPolicy(int id)
        {
            try
            {
                var policy = await context.EbookRentalPolicy.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                return new Response("Success", true, 1, policy);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateEBookPayment(int policyID, int userID)
        {
            try
            {
                var count = await context.EbookPayment.CountAsync();
                var paymentID = "Payment" + (count + 1);
                var ebookPayment = new EbookPayment
                {
                    PaymentId = paymentID,
                    PolicyId = policyID,
                    UserId = userID,
                    RentedDate = DateTime.Now
                };
                await context.EbookPayment.AddAsync(ebookPayment);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    var ebookPaymentResponse = await context.EbookPayment.Include(x => x.Policy)
                        .Where(x => x.PaymentId.Equals(paymentID))
                        .FirstOrDefaultAsync();
                    return new Response("Success", true, 1, ebookPaymentResponse);
                }
                else
                {
                    return new Response("Create payment fail!", false, 0, ebookPayment);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateUserEBook(int userID, DateTime expiredDate)
        {
            try
            {
                var userEBook = new UserEbook()
                {
                    UserId = userID,
                    ExpiredDate = expiredDate
                };
                await context.UserEbook.AddAsync(userEBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, userEBook);
                }
                else
                {
                    return new Response("Create fail!", false, 0, userEBook);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateUserEBook(int userID, int days)
        {
            try
            {
                var userEBook = await context.UserEbook.Where(x => x.UserId.Equals(userID)).FirstOrDefaultAsync();
                userEBook.ExpiredDate = userEBook.ExpiredDate.AddDays(days);

                context.UserEbook.Update(userEBook);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, userEBook);
                }
                else
                {
                    return new Response("Update fail!", false, 0, userEBook);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateTransactionRentEBook(string stripeEmail, string stripeToken, int policyID,
            int userID)
        {
            try
            {
                var transaction = await context.Database.BeginTransactionAsync();
                var count = await context.EbookPayment.Where(x => x.UserId.Equals(userID)).CountAsync();
                var policy = (await GetEBookRentalPolicy(policyID)).Obj as EbookRentalPolicy;
                if (count is 0)
                {
                    var checkUserEBook = await CreateUserEBook(userID, DateTime.Now.AddDays(policy.NumberRentedDay));
                    var checkPayment = await CreateEBookPayment(policyID, userID);
                    if (checkUserEBook.Status && checkPayment.Status)
                    {
                        var stripeResponse = await StripePaymentHelper.CreateEBookRentedCharge(stripeEmail, stripeToken,
                            checkPayment.Obj as EbookPayment, checkUserEBook.Obj as UserEbook, policy);
                        if (stripeResponse.Status)
                        {
                            transaction.Commit();
                            return stripeResponse;
                        }
                        else
                        {
                            transaction.Rollback();
                            return stripeResponse;
                        }
                    }
                    else
                    {
                        if (checkPayment.Status)
                        {
                            return checkPayment;
                        }
                        else
                        {
                            return checkUserEBook;
                        }
                    }
                }
                else
                {
                    var checkPayment = await CreateEBookPayment(policyID, userID);
                    var checkUserEBook = await UpdateUserEBook(userID, policy.NumberRentedDay);
                    if (checkUserEBook.Status && checkPayment.Status)
                    {
                        var stripeResponse = await StripePaymentHelper.CreateEBookRentedCharge(stripeEmail, stripeToken,
                            checkPayment.Obj as EbookPayment, checkUserEBook.Obj as UserEbook, policy);
                        if (stripeResponse.Status)
                        {
                            transaction.Commit();
                            return stripeResponse;
                        }
                        else
                        {
                            transaction.Rollback();
                            return stripeResponse;
                        }
                    }
                    else
                    {
                        if (checkPayment.Status)
                        {
                            return checkPayment;
                        }
                        else
                        {
                            return checkUserEBook;
                        }
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
