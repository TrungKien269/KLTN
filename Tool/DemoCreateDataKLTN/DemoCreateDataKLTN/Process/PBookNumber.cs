using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.Process
{
    public class PBookNumber
    {
        private BookNumberBAL BookNumberBal;

        public PBookNumber()
        {
            BookNumberBal = new BookNumberBAL();
        }

        public void Execute()
        {
            var dsBook = PGetListMainObject.GetListBook();

            for (int i = 0; i < dsBook.Tables[0].Rows.Count; i++)
            {
                var bookNumber = new BookNumber
                {
                    BookID = dsBook.Tables[0].Rows[i][0].ToString(),
                    Amount = 100
                };
                BookNumberBal.InsertBookNumber(bookNumber);
                Console.WriteLine(dsBook.Tables[0].Rows[i][0].ToString());
            }
        }
    }
}
