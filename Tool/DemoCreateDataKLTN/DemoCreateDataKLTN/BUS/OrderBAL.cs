using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.BUS
{
    public class OrderBAL
    {
        private SQLManager sql;

        public OrderBAL()
        {
            sql = new SQLManager();
        }

        public Notification GetAllOrderQuantity()
        {
            string strSQL = "Select Count(*) From dbo.[Order];";

            return sql.ExecuteScalar(strSQL, CommandType.Text, null);
        }

        public Notification InsertOrder(Order order)
        {
            string strSQL =
                "Insert into dbo.[Order] Values(@ID, @User_ID, @CreatedDate, @Total, @FullName, @PhoneNumber, @Address, @Status)";

            return sql.ExecuteNonQuery(strSQL, CommandType.Text, new SqlParameter("@ID", order.Id),
                new SqlParameter("@User_ID", order.UserId), new SqlParameter("@CreatedDate", order.CreatedDate),
                new SqlParameter("@Total", order.Total), new SqlParameter("@FullName", order.FullName),
                new SqlParameter("@PhoneNumber", order.PhoneNumber), new SqlParameter("@Address", order.Address),
                new SqlParameter("@Status", order.Status));
        }
    }
}
