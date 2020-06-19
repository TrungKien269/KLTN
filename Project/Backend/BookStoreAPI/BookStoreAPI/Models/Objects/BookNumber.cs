using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public partial class BookNumber
    {
        [Key]
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        public int Amount { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("BookNumber")]
        public Book Book { get; set; }
    }
}
