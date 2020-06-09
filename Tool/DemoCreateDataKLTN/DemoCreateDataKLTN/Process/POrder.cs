using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.Helper;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.Process
{
    public class POrder
    {
        //private UserBAL userBal;
        private OrderBAL orderBal;
        private OrderDetailBAL orderDetailBal;
        //private BookBAL bookBal;
        private PRating pRating;
        private string[] OrderStatus;

        public POrder()
        {
            //userBal = new UserBAL();
            orderBal = new OrderBAL();
            //bookBal = new BookBAL();
            orderDetailBal = new OrderDetailBAL();
            pRating = new PRating();
            OrderStatus = new[] {"Processing", "Delivering", "Delivered"};
        }

        public void Execute()
        {
            var dsUser = PGetListMainObject.GetListUser();
            var dsBook = PGetListMainObject.GetListBook();

            for (int i = 0; i < dsUser.Tables[0].Rows.Count; i++)
            {
                var orderDetail = new OrderDetail
                {
                    OrderId = "Order" + (Int32.Parse(orderBal.GetAllOrderQuantity().Obj.ToString()) + 1),
                    BookId = dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][0].ToString(),
                    Quantity = GetRandomNumberQuantity()
                };

                var order = new Order
                {
                    Id = "Order" + (Int32.Parse(orderBal.GetAllOrderQuantity().Obj.ToString()) + 1),
                    UserId = Int32.Parse(dsUser.Tables[0].Rows[i][0].ToString()),
                    Total = Int32.Parse(dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][3].ToString()) *
                            orderDetail.Quantity,
                    Status = OrderStatus[GetRandomOrderStatus()],
                    FullName = dsUser.Tables[0].Rows[i][1].ToString(),
                    PhoneNumber = dsUser.Tables[0].Rows[i][4].ToString(),
                    Address = dsUser.Tables[0].Rows[i][5].ToString(),
                    CreatedDate = GetRandomDateTime(),
                    Type = "COD",
                    ShippingFee = GetRandomShippingFee()
                };

                orderBal.InsertOrder(order);
                orderDetailBal.InsertOrderDetail(orderDetail);
                //QRHelper.GenerateAndSaveQRCode("Order" + i);

                Console.WriteLine(dsUser.Tables[0].Rows[i][0].ToString());
            }
        }

        public int GetRandomShippingFee()
        {
            Random r = new Random();
            int result = r.Next(15, 100);
            return result * 1000;
        }

        public int GetRandomNumberQuantity()
        {
            Random r = new Random();
            int result = r.Next(1, 3);
            return result;
        }

        public int GetRandomOrderStatus()
        {
            Random r = new Random();
            int result = r.Next(0, 3);
            return result;
        }

        public DateTime GetRandomDateTime()
        {
            Random r = new Random();
            var from = new DateTime(2020, 1, 1);
            var range = DateTime.Now - from;
            var randomUpperBound = (Int32)range.TotalSeconds;
            var randTimeSpan = TimeSpan.FromSeconds((Int64)(range.TotalSeconds - r.Next(0, randomUpperBound)));

            return from + randTimeSpan;
        }
    }
}
