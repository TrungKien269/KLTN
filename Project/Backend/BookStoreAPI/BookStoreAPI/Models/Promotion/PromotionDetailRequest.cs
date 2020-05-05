using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Promotion
{
    public class PromotionDetailRequest
    {
        public int PromotionID { get; set; }
        public string BookID { get; set; }
        public float Discount { get; set; }
    }
}
