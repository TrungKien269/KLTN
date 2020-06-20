using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Checkout;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class OrderBAL
    {
        private BookStoreContext context;

        public OrderBAL()
        {
            context = new BookStoreContext();
        }

        public async Task<Response> CountOrder()
        {
            try
            {
                int count = await context.Order.CountAsync();
                return new Response("Success", true, 1, count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateOrder(Order order)
        {
            try
            {
                await context.Order.AddAsync(order);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                    return new Response("Success", true, 1, order);
                return Response.CatchError("Error when Create Order");
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateOrderDetail(OrderDetail orderDetail)
        {
            try
            {
                await context.OrderDetail.AddAsync(orderDetail);
                var check = await context.SaveChangesAsync();
                if (check is 1)
                    return new Response("Success", true, 1, orderDetail);
                return Response.CatchError("Error when Create Order Detail");
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateOrderProcess(OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            try
            {
                var bookNumberBal = new BookNumberBAL();
                var order = new Order
                {
                    Id = "Order" + (((await CountOrder()).Obj as int?).Value + 1),
                    FullName = orderRequest.FullName,
                    PhoneNumber = orderRequest.PhoneNumber,
                    Address = orderRequest.Address,
                    CreatedDate = DateTime.Now,
                    Status = "Processing",
                    UserId = userID,
                    ShippingFee = orderRequest.ShippingFee,
                    Type = orderRequest.Type,
                    Total = orderRequest.Total
                };

                var response = await CreateOrder(order);
                if (response.Status is false)
                    throw new Exception(response.Message);

                order.OrderDetail = new List<OrderDetail>();
                foreach (var orderDetailRequest in orderDetailRequests)
                {
                    var orderDetail = new OrderDetail
                    {
                        BookId = orderDetailRequest.BookID,
                        OrderId = order.Id,
                        Quantity = orderDetailRequest.Quantity
                    };
                    order.OrderDetail.Add(orderDetail);
                    response = await CreateOrderDetail(orderDetail);
                    if (response.Status is false)
                        throw new Exception(response.Message);
                    response = await bookNumberBal.UpdateNumberForBook(orderDetailRequest.BookID,
                        orderDetailRequest.Quantity);
                    if (response.Status is false)
                        throw new Exception(response.Message);
                }
                return new Response("Success", true, 1, order);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CreateTransactionCOD(OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            var transaction = await context.Database.BeginTransactionAsync();
            var task = await CreateOrderProcess(orderRequest, orderDetailRequests, userID);
            if (task.Status)
            {

                transaction.Commit();
            }
            else
            {
                transaction.Rollback();
            }
            return task;
        }

        public async Task<Response> CreateTransactionStripe(string stripeEmail, string stripeToken, OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            var transaction = await context.Database.BeginTransactionAsync();
            var task = await CreateOrderProcess(orderRequest, orderDetailRequests, userID);
            if (task.Status)
            {
                var response = await StripePaymentHelper.CreateOnlineCharge(stripeEmail, stripeToken,
                    (task.Obj as Order).Id, orderRequest, orderDetailRequests);
                if (response.Status)
                {
                    transaction.Commit();
                }
                else
                {
                    transaction.Rollback();
                }
            }
            else
            {
                transaction.Rollback();
            }
            return task;
        }

        public async Task<Response> CreateTransactionPayPal(string email, string paypalOrderID, OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            var transaction = await context.Database.BeginTransactionAsync();
            var task = await CreateOrderProcess(orderRequest, orderDetailRequests, userID);
            if (task.Status)
            {
                var response =
                    await PayPalPaymentHelper.CreatePayPalOrder(email, paypalOrderID, orderRequest,
                        orderDetailRequests);
                if (response.Status)
                {
                    transaction.Commit();
                }
                else
                {
                    transaction.Rollback();
                }
            }
            else
            {
                transaction.Rollback();
            }
            return task;
        }

        public async Task<Response> GetListProcessingOrders()
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Status.Equals("Processing"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListDeliveryOrders()
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Status.Equals("Delivering"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListDeliveredOrders()
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Status.Equals("Delivered"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListCanceledOrders()
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Status.Equals("Canceled"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListUserProcessingOrders(int userID)
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.UserId.Equals(userID) && x.Status.Equals("Processing"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListUserDeliveryOrders(int userID)
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.UserId.Equals(userID) && x.Status.Equals("Delivering"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListUserDeliveredOrders(int userID)
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.UserId.Equals(userID) && x.Status.Equals("Delivered"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListUserCanceledOrders(int userID)
        {
            try
            {
                var listOrders = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.UserId.Equals(userID) && x.Status.Equals("Canceled"))
                    .OrderByDescending(x => x.CreatedDate).ToListAsync();
                return new Response("Success", true, 1, listOrders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateStatusOrder(Order order, string status)
        {
            try
            {
                order.Status = status;
                context.Order.Update(order);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, order);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetOrder(string id)
        {
            try
            {
                var order = await context.Order.Include(x => x.OrderDetail).ThenInclude(x => x.Book)
                    .Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                return new Response("Success", true, 1, order);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> StatisticsNumberExportedOrderWithMonth()
        {
            try
            {
                var orders = await context.Order.Where(x => x.Status.Equals("Delivered"))
                    .GroupBy(x => x.CreatedDate.Month).Select(x => new
                    {
                        Month = x.Key,
                        NumberOrder = x.Count()
                    }).OrderBy(x => x.Month).ToListAsync();
                return new Response("Success", true, orders.Count, orders);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CheckNumberBookOrder(List<OrderDetailRequest> orderDetailRequests)
        {
            try
            {
                var flag = 1;
                var count = 0;
                for (int i = 0; i < orderDetailRequests.Count; i++)
                {
                    var bookNumber = await context.BookNumber.Where(x => x.BookId.Equals(orderDetailRequests[i].BookID))
                        .FirstOrDefaultAsync();
                    if (orderDetailRequests[i].Quantity > bookNumber.Amount)
                    {
                        flag = 0;
                        count++;
                        orderDetailRequests[i].Quantity = bookNumber.Amount;
                    }
                }

                if (flag is 1)
                {
                    return new Response("Success", true, count, orderDetailRequests);
                }
                else
                {
                    return new Response("Fail", false, count, orderDetailRequests);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
