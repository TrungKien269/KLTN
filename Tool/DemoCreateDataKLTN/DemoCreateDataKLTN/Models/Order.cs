using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCreateDataKLTN.Models
{
    public class Order
    {
        public string Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Total { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
    }
}
