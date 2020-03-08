using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DemoCreateDataKLTN.Models
{
    public class SearchHistory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int user_id { get; set; }

        public string words { get; set; }

        public DateTime datetime { get; set; }
    }
}
