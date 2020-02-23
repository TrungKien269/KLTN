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

        public void Execute(string bookID, int userID)
        {
            var rating = new Rating
            {
                UserId = userID,
                BookId = bookID,
                DateTime = DateTime.Now,
                Point = GetRandomPoint()
            };

            ratingBal.InsertRating(rating);
        }

        public int GetRandomPoint()
        {
            Random r = new Random();
            int result = r.Next(7, 11);
            return result;
        }
    }
}
