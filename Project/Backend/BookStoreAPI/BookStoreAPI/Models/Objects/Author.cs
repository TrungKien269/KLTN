using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Author
    {
        public Author()
        {
            AuthorBook = new HashSet<AuthorBook>();
        }

        [Column("ID")]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [InverseProperty("Author")]
        public virtual ICollection<AuthorBook> AuthorBook { get; set; }
    }
}
