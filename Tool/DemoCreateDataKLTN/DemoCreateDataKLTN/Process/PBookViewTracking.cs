using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.Process
{
    public class PBookViewTracking
    {
        private BookViewTrackingBAL bookViewTrackingBal;

        public PBookViewTracking()
        {
            bookViewTrackingBal = new BookViewTrackingBAL();
        }

        public void Execute()
        {
            var dsUser = PGetListMainObject.GetListUser();
            var dsBook = PGetListMainObject.GetListBook();

            for (int i = 0; i < dsUser.Tables[0].Rows.Count; i++)
            {
                var track = new BookViewTracking
                {
                    user_id = Int32.Parse(dsUser.Tables[0].Rows[i][0].ToString()),
                    book_id = dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][0].ToString(),
                    datetime = GetRandomDateTime()
                };

                bookViewTrackingBal.Create(track);
                Console.WriteLine(dsUser.Tables[0].Rows[i][0].ToString());
            }
        }

        public DateTime GetRandomDateTime()
        {
            Random r = new Random();
            var from = new DateTime(2020, 1, 1);
            var range = DateTime.Now - from;
            var randomUpperBound = (Int32)range.TotalSeconds;
            var randTimeSpan = TimeSpan.FromSeconds((Int64)(range.TotalSeconds - r.Next(0, randomUpperBound)));

            return from + randTimeSpan;
        }
    }
}
