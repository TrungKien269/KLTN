using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models;
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
                return new Response("Success", true, 1, order);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
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

        
    }
}
