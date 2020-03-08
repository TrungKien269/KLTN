using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Models;
using MongoDB.Driver;

namespace DemoCreateDataKLTN.BUS
{
    public class SearchHistoryBAL
    {
        private readonly IMongoCollection<SearchHistory> _SearchHistory;

        public SearchHistoryBAL()
        {
            _SearchHistory = MongoDBManager.ConfigDatabase().GetCollection<SearchHistory>("search_history");
        }

        public List<SearchHistory> Get(int userID) => _SearchHistory.Find(x => x.user_id.Equals(userID))
            .SortBy(x => x.datetime).Limit(5).ToList();

        public SearchHistory Create(SearchHistory searchHistory)
        {
            _SearchHistory.InsertOne(searchHistory);
            return searchHistory;
        }
    }
}
