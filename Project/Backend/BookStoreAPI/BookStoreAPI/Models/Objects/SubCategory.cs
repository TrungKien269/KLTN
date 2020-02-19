using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class SubCategory
    {
        public SubCategory()
        {
            BookCategory = new HashSet<BookCategory>();
        }

        [Column("ID")]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Column("Cate_ID")]
        public int CateId { get; set; }

        [ForeignKey("CateId")]
        [InverseProperty("SubCategory")]
        public virtual Category Cate { get; set; }
        [InverseProperty("Cate")]
        public virtual ICollection<BookCategory> BookCategory { get; set; }
    }
}
