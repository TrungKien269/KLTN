using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using DemoCreateDataKLTN.BUS;

namespace DemoCreateDataKLTN.Process
{
    public static class PGetListMainObject
    {
        private static UserBAL userBal = new UserBAL();
        private static BookBAL bookBal = new BookBAL();

        public static DataSet GetListUser()
        {
            return userBal.GetListUser();
        }

        public static DataSet GetListBook()
        {
            return bookBal.GetListBook();
        }

        public static int GetRandomNumberIndexBookList()
        {
            Random r = new Random();
            int result = r.Next(0, 4739);
            return result;
        }
    }
}
