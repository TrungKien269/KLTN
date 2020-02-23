using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCreateDataKLTN.Models
{
    public class OrderDetail
    {
        public string OrderId { get; set; }
        public string BookId { get; set; }
        public int Quantity { get; set; }
    }
}
