using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.Models.Statistics
{
    public class TopUser
    {
        public User user { get; set; }
        public int numberOfBook { get; set; }
    }
}
