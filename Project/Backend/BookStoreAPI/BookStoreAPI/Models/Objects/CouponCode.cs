using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public class CouponCode
    {
        [Column("ID")]
        [MaxLength(20)]
        public string Id { get; set; }
        public Single Value { get; set; }
        public int State { get; set; }
    }
}
