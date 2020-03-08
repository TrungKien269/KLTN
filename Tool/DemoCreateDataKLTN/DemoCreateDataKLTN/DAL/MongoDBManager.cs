using System;
using System.Collections.Generic;
using System.Text;
using DemoCreateDataKLTN.Helper;
using DemoCreateDataKLTN.Models;
using MongoDB.Driver;

namespace DemoCreateDataKLTN.DAL
{
    public class MongoDBManager
    {
        private static string strConn = ConfigHelper.GetConfig().GetSection("DatabaseSettings").GetSection("ConnectionString")
            .Value;
        private static string dbName = ConfigHelper.GetConfig().GetSection("DatabaseSettings").GetSection("DatabaseName")
            .Value;

        private static MongoClient client;
        private static IMongoDatabase database;

        public static IMongoDatabase ConfigDatabase()
        {
            client = new MongoClient(strConn);
            database = client.GetDatabase(dbName);
            return database;
        }
    }
}
