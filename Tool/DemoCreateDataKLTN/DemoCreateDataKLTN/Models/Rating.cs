using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCreateDataKLTN.Models
{
    public class Rating
    {
        public int UserId { get; set; }
        public string BookId { get; set; }
        public int Point { get; set; }
        public DateTime DateTime { get; set; }
    }
}
