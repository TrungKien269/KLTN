using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using DemoCreateDataKLTN.DAL;

namespace DemoCreateDataKLTN.BUS
{
    public class BookBAL
    {
        private SQLManager sql;

        public BookBAL()
        {
            sql = new SQLManager();
        }

        public DataSet GetListBook()
        {
            string strSQL = "Select * From dbo.[Book];";

            return sql.ExecuteReader(strSQL, CommandType.Text, null);
        }
    }
}
