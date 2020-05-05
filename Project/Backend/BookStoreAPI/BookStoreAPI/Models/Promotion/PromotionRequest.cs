using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Promotion
{
    public class PromotionRequest
    {
        public DateTime EndedDate { get; set; }
        public string Description { get; set; }
    }
}
