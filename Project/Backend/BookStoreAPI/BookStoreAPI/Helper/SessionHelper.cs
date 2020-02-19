using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace BookStoreAPI.Helper
{
    public class SessionHelper
    {
        public static void SetObjectAsJson(ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }

        public static void SetWebsiteSession(ISession session, string hash)
        {
            session.SetString("BookStore", hash);
        }

        public static void SetAdminSession(ISession session, string hash)
        {
            session.SetString("Admin", hash);
        }

        public static void SetAnonymousWebsiteSession(ISession session)
        {
            var hash = CryptographyHelper.CreateSalt(32);
            session.SetString("BookStore", hash);
        }

        public static void SetUserSession(ISession session, int userID, string fullname)
        {
            session.SetInt32("UserID", userID);
            session.SetString("UserFullName", fullname);
        }

        public static void CreateCartSession(ISession session)
        {
            SetObjectAsJson(session, "Cart", new List<CartBook>());
        }

        public static void SetCartSession(ISession session, List<CartBook> cart)
        {
            SetObjectAsJson(session, "Cart", cart);
        }

        public static List<CartBook> GetCartSession(ISession session)
        {
            return GetObjectFromJson<List<CartBook>>(session, "Cart");
        }

        public static void ResetCartSession(ISession session, List<CartBook> cart)
        {
            cart.Clear();
            SetObjectAsJson(session, "Cart", cart);
        }

        public static void CreateOrdersSession(ISession session)
        {
            SetObjectAsJson(session, "Orders", new List<Order>());
        }

        public static void SetOrdersSession(ISession session, List<Order> orders)
        {
            SetObjectAsJson(session, "Orders", orders);
        }

        public static List<Order> GetOrdersSession(ISession session)
        {
            return GetObjectFromJson<List<Order>>(session, "Orders");
        }

        public static void ResetCartSession(ISession session, List<Order> orders)
        {
            orders.Clear();
            SetObjectAsJson(session, "Orders", orders);
        }

        public static void ClearSessionLogout(ISession session)
        {
            session.Remove("UserID");
            session.Remove("UserFullName");
        }

        public static void ClearAllSession(ISession session)
        {
            session.Clear();
        }
    }
}
