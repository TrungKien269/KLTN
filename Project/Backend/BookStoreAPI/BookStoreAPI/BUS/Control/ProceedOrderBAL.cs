using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Checkout;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class ProceedOrderBAL
    {
        private CartBAL cartBal;
        private UserBAL userBal;
        private OrderBAL orderBal;
        private BookBAL bookBal;
        private CouponCodeBAL couponCodeBal;

        public ProceedOrderBAL()
        {
            this.cartBal = new CartBAL();
            this.userBal = new UserBAL();
            this.orderBal = new OrderBAL();
            this.bookBal = new BookBAL();
            couponCodeBal = new CouponCodeBAL();
        }

        public async Task<Response> GetCart(int userID)
        {
            return await cartBal.GetCart(userID);
        }

        public async Task<Response> ResetCart(int cartID)
        {
            return await cartBal.ResetCart(cartID);
        }

        public async Task<Response> CountOrder()
        {
            return await orderBal.CountOrder();
        }

        public async Task<Response> CreateOrder(Order order)
        {
            return await orderBal.CreateOrder(order);
        }

        public async Task<Response> CreateTransactionCOD(OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            return await orderBal.CreateTransactionCOD(orderRequest, orderDetailRequests, userID);
        }

        public async Task<Response> CreateTransactionStripe(string stripeEmail, string stripeToken,
            OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            return await orderBal.CreateTransactionStripe(stripeEmail, stripeToken, orderRequest, orderDetailRequests,
                userID);
        }

        public async Task<Response> CreateTransactionPayPal(string email, string paypalOrderID,
            OrderRequest orderRequest,
            List<OrderDetailRequest> orderDetailRequests, int userID)
        {
            return await orderBal.CreateTransactionPayPal(email, paypalOrderID, orderRequest, orderDetailRequests,
                userID);
        }

        public async Task<Response> GetBook(string bookID)
        {
            return await bookBal.GetBookOnly(bookID);
        }

        public async Task<Response> GetUser(int userID)
        {
            return await userBal.GetUser(userID);
        }

        public async Task<Response> CheckCoupon(string code)
        {
            return await couponCodeBal.CheckCoupon(code);
        }
    }
}
