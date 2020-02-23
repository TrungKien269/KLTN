using System;
using System.Collections.Generic;
using System.Text;

namespace DemoCreateDataKLTN.Models
{
    public class Book
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public Int32 OriginalPrice { get; set; }
        public Int32 CurrentPrice { get; set; }
        public int ReleaseYear { get; set; }
        public double Weight { get; set; }
        public int NumOfPage { get; set; }
        public string Image { get; set; }
        public string Summary { get; set; }
        public string Status { get; set; }
    }
}
