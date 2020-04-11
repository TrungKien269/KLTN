using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.Process
{
    public class PSearchHistory
    {
        private SearchHistoryBAL searchHistoryBal;

        public PSearchHistory()
        {
            searchHistoryBal = new SearchHistoryBAL();
        }

        public void Execute()
        {
            var dsUser = PGetListMainObject.GetListUser();
            var dsBook = PGetListMainObject.GetListBook();

            for (int i = 0; i < dsUser.Tables[0].Rows.Count; i++)
            {
                //var search = new SearchHistory
                //{
                //    user_id = Int32.Parse(dsUser.Tables[0].Rows[i][0].ToString()),
                //    words = dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][0].ToString(),
                //    datetime = GetRandomDateTime()
                //};

                var search = new SearchHistory
                {
                    UserId = Int32.Parse(dsUser.Tables[0].Rows[i][0].ToString()),
                    Words = dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][0].ToString(),
                    DateTime = GetRandomDateTime()
                };

                //searchHistoryBal.Create(search);
                searchHistoryBal.InsertSearchHistory(search);
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
