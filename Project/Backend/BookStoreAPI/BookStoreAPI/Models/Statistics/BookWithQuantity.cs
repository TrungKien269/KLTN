using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.Models.Statistics
{
    public class BookWithQuantity
    {
        public Book book { get; set; }
        public int quantity { get; set; }
    }
}
