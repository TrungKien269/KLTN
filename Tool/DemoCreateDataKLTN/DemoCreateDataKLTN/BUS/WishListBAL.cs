using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.BUS
{
    public class WishListBAL
    {
        private SQLManager sql;

        public WishListBAL()
        {
            sql = new SQLManager();
        }

        public Notification InsertWishList(WishList wishList)
        {
            string strSQL = "Insert into dbo.[WishList] values(@UserID, @BookID, @DateTime)";

            return sql.ExecuteNonQuery(strSQL, CommandType.Text, new SqlParameter("@UserID", wishList.UserId),
                new SqlParameter("@BookID", wishList.BookId), new SqlParameter("@DateTime", wishList.DateTime));
        }
    }
}
