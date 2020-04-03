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
                    DateTime = DateTime.Now,
                    Point = GetRandomPoint()
                };

                ratingBal.InsertRating(rating);

                Console.WriteLine(dsUser.Tables[0].Rows[i][0].ToString());
            }
        }

        public int GetRandomPoint()
        {
            Random r = new Random();
            int result = r.Next(7, 11);
            return result;
        }
    }
}
