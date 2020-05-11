using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Checkout
{
    public class OrderDetailRequest
    {
        public string BookID { get; set; }
        public string BookName { get; set; }
        public int CurrentPrice { get; set; }
        public int Quantity { get; set; }
    }
}
