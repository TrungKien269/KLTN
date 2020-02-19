using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class PublisherBook
    {
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("Publisher_ID")]
        public int PublisherId { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("PublisherBook")]
        public virtual Book Book { get; set; }
        [ForeignKey("PublisherId")]
        [InverseProperty("PublisherBook")]
        public virtual Publisher Publisher { get; set; }
    }
}
