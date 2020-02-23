using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using DemoCreateDataKLTN.DAL;

namespace DemoCreateDataKLTN.BUS
{
    public class UserBAL
    {
        private SQLManager sql;

        public UserBAL()
        {
            sql = new SQLManager();
        }

        public DataSet GetListUser()
        {
            string strSQL = "Select * From dbo.[User];";

            return sql.ExecuteReader(strSQL, CommandType.Text, null);
        }
    }
}
