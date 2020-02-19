using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class FormBook
    {
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("Form_ID")]
        public int FormId { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("FormBook")]
        public virtual Book Book { get; set; }
        [ForeignKey("FormId")]
        [InverseProperty("FormBook")]
        public virtual Form Form { get; set; }
    }
}
