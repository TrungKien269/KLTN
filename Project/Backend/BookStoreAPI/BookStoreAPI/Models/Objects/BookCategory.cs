using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class BookCategory
    {
        [Column("BookID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("CateID")]
        public int CateId { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("BookCategory")]
        public virtual Book Book { get; set; }
        [ForeignKey("CateId")]
        [InverseProperty("BookCategory")]
        public virtual SubCategory Cate { get; set; }
    }
}
