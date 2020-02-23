using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.BUS
{
    public class OrderDetailBAL
    {
        private SQLManager sql;

        public OrderDetailBAL()
        {
            sql = new SQLManager();
        }

        public Notification InsertOrderDetail(OrderDetail orderDetail)
        {
            string strSQL = "Insert into dbo.[OrderDetail] Values(@Order_ID, @Book_ID, @Quantity)";

            return sql.ExecuteNonQuery(strSQL, CommandType.Text, new SqlParameter("@Order_ID", orderDetail.OrderId),
                new SqlParameter("@Book_ID", orderDetail.BookId), new SqlParameter("@Quantity", orderDetail.Quantity));
        }
    }
}
