using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class PromotionDetail
    {
        [Column("Promotion_ID")]
        public int PromotionId { get; set; }
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        public float Discount { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("PromotionDetail")]
        public virtual Book Book { get; set; }
        [ForeignKey("PromotionId")]
        [InverseProperty("PromotionDetail")]
        public virtual Promotion Promotion { get; set; }
    }
}
