using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class UserOrderBAL
    {
        private OrderBAL orderBal;

        public UserOrderBAL()
        {
            orderBal = new OrderBAL();
        }

        public async Task<Response> GetListProcessing(int userID)
        {
            return await orderBal.GetListUserProcessingOrders(userID);
        }

        public async Task<Response> GetListDelivery(int userID)
        {
            return await orderBal.GetListUserDeliveryOrders(userID);
        }

        public async Task<Response> GetListDelivered(int userID)
        {
            return await orderBal.GetListUserDeliveredOrders(userID);
        }

        public async Task<Response> GetListCanceled(int userID)
        {
            return await orderBal.GetListUserCanceledOrders(userID);
        }

        public async Task<Response> GetOrder(string id)
        {
            return await orderBal.GetOrder(id);
        }

        public async Task<Response> UpdateStatus(Order order, string status)
        {
            return await orderBal.UpdateStatusOrder(order, status);
        }
    }
}
