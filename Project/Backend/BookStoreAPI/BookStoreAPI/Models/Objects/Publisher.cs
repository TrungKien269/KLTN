using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Publisher
    {
        public Publisher()
        {
            PublisherBook = new HashSet<PublisherBook>();
        }

        [Column("ID")]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [InverseProperty("Publisher")]
        public virtual ICollection<PublisherBook> PublisherBook { get; set; }
    }
}
