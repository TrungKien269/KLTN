using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.Models;

namespace DemoCreateDataKLTN.Process
{
    public class PRating
    {
        private RatingBAL ratingBal;

        public PRating()
        {
            ratingBal = new RatingBAL();
        }

        public void Execute()
        {
            var dsUser = PGetListMainObject.GetListUser();
            var dsBook = PGetListMainObject.GetListBook();

            for (int i = 0; i < dsUser.Tables[0].Rows.Count; i++)
            {
                var rating = new Rating
                {
                    //UserId = userID,
                    UserId = Int32.Parse(dsUser.Tables[0].Rows[i][0].ToString()),
                    //BookId = bookID,
                    BookId = dsBook.Tables[0].Rows[PGetListMainObject.GetRandomNumberIndexBookList()][0].ToString(),
                    DateTime = GetRandomDateTime(),
                    Point = GetRandomPoint()
                };

                ratingBal.InsertRating(rating);

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

        public int GetRandomPoint()
        {
            Random r = new Random();
            int result = r.Next(7, 11);
            //int result = r.Next(1, 6);
            return result;
        }
    }
}
