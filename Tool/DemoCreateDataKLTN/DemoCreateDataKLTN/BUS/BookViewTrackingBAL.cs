using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;
using MongoDB.Driver;

namespace DemoCreateDataKLTN.BUS
{
    public class BookViewTrackingBAL
    {
        private readonly IMongoCollection<BookViewTracking> _BookViewTracking;

        public BookViewTrackingBAL()
        {
            _BookViewTracking = MongoDBManager.ConfigDatabase().GetCollection<BookViewTracking>("book_view_tracking");
        }

        public BookViewTracking Create(BookViewTracking bookViewTracking)
        {
            _BookViewTracking.InsertOne(bookViewTracking);
            return bookViewTracking;
        }

        public List<BookViewTracking> GetRecentBookView(int userID)
        {
            return _BookViewTracking
                .Find(x => x.user_id.Equals(userID) && Math.Abs(DateTime.Now.Subtract(x.datetime).TotalDays) <= 7).ToList();
        }
    }
}
