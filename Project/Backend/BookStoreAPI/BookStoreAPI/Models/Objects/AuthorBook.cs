using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class AuthorBook
    {
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("Author_ID")]
        public int AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        [InverseProperty("AuthorBook")]
        public virtual Author Author { get; set; }
        [ForeignKey("BookId")]
        [InverseProperty("AuthorBook")]
        public virtual Book Book { get; set; }
    }
}
