using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class ImportReceiptBAL
    {
        private BookStoreContext context;
        private BookNumberBAL bookNumberBal;

        public ImportReceiptBAL()
        {
            this.context = new BookStoreContext();
            bookNumberBal = new BookNumberBAL();
        }

        public async Task<Response> GetListReceipt()
        {
            try
            {
                var list = await context.ImportReceipt.ToListAsync();
                return new Response("Success", true, list.Count, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetReceipt(string currentID)
        {
            try
            {
                var receipt = await context.ImportReceipt.Where(x => x.Id.Equals(currentID)).FirstOrDefaultAsync();
                if (receipt is null)
                {
                    return new Response("Not found", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, receipt);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertReceipt(ImportReceipt receipt)
        {
            try
            {
                await context.ImportReceipt.AddAsync(receipt);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, receipt);
                }
                else
                {
                    return new Response("Insert fail!", false, 0, receipt);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> ImportReceiptTransaction(List<BookNumber> bookNumbers, ImportReceipt receipt)
        {
            var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                foreach (var bookNum in bookNumbers)
                {
                    var check = await bookNumberBal.InsertNumberForBook(bookNum.BookId, bookNum.Amount);
                    if (check.Status is false)
                    {
                        throw new Exception(check.Message);
                    }
                }
                var response = await InsertReceipt(receipt);
                if (response.Status)
                {
                    transaction.Commit();
                    return response;
                }
                else
                {
                    transaction.Rollback();
                    return response;
                }
            }
            catch (Exception e)
            {
                transaction.Rollback();
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateReceipt(ImportReceipt receipt)
        {
            try
            {
                context.ImportReceipt.Update(receipt);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                {
                    return new Response("Success", true, 1, receipt);
                }
                else
                {
                    return new Response("Update fail!", false, 0, receipt);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
