using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using DemoCreateDataKLTN.DAL;

namespace DemoCreateDataKLTN.BUS
{
    public class AccountBAL
    {
        private SQLManager sql;

        public AccountBAL()
        {
            sql = new SQLManager();
        }

        public DataSet GetListAccountID()
        {
            string strSQL = "Select ID From Account Where ID > 0;";

            return sql.ExecuteReader(strSQL, CommandType.Text, null);
        }
    }
}
