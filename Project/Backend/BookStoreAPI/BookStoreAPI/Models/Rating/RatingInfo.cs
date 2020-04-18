using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Rating
{
    public class RatingInfo
    {
        public Int32 SumOfPoint { get; set; }
        public Int32 NumberOfRating { get; set; }
        public Double AveragePoint { get; set; }

        public RatingInfo() { }

        public RatingInfo(int sumOfPoint, int numberOfRating, double averagePoint)
        {
            SumOfPoint = sumOfPoint;
            NumberOfRating = numberOfRating;
            AveragePoint = averagePoint;
        }
    }
}
