using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.BUS
{
    public class BookNumberBAL
    {
        private SQLManager sql;

        public BookNumberBAL()
        {
            sql = new SQLManager();
        }

        public Notification InsertBookNumber(BookNumber bookNumber)
        {
            string strSQL = "Insert into BookNumber Values(@Book_ID, @Amount)";

            return sql.ExecuteNonQuery(strSQL, CommandType.Text, new SqlParameter("@Book_ID", bookNumber.BookID),
                new SqlParameter("@Amount", bookNumber.Amount));
        }
    }
}
