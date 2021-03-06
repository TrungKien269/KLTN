﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Checkout
{
    public class OrderRequest
    {
        public string Type { get; set; }
        public int Total { get; set; }
        public int ShippingFee { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}
