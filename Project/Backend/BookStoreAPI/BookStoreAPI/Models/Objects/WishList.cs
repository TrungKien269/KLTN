using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public class WishList
    {
        [Column("UserID")]
        public int UserId { get; set; }
        [Column("BookID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime DateTime { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("WishList")]
        public virtual Book Book { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("WishList")]
        public virtual User User { get; set; }
    }
}
