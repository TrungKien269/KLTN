using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.BUS
{
    public class RatingBAL
    {
        private SQLManager sql;

        public RatingBAL()
        {
            sql = new SQLManager();
        }

        public Notification InsertRating(Rating rating)
        {
            string strSQL = "Insert into dbo.[Rating] values(@User_ID, @Book_ID, @Point, @DateTime)";

            return sql.ExecuteNonQuery(strSQL, CommandType.Text, new SqlParameter("@User_ID", rating.UserId),
                new SqlParameter("@Book_ID", rating.BookId), new SqlParameter("@Point", rating.Point),
                new SqlParameter("@DateTime", rating.DateTime));
        }
    }
}
