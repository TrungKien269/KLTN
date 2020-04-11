using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DemoCreateDataKLTN.Models
{
    public class BookViewTracking
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string Id { get; set; }

        //public int user_id { get; set; }

        //public string book_id { get; set; }

        //public DateTime datetime { get; set; }
        
        public int UserId { get; set; }
        public string BookId { get; set; }
        public DateTime DateTime { get; set; }
    }
}
