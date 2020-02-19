using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class ImageBook
    {
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("Image_ID")]
        public int ImageId { get; set; }
        [Required]
        public string Path { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("ImageBook")]
        public virtual Book Book { get; set; }
    }
}
