using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Comment
    {
        [Column("ID")]
        [Key]
        public int Id { get; set; }
        [Column("User_ID")]
        public int UserId { get; set; }
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Required]
        [Column("Comment")]
        public string Text { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime DateTime { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("Comment")]
        public virtual Book Book { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("Comment")]
        public virtual User User { get; set; }
    }
}
