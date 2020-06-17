using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public partial class EBook
    {
        [Column("ID")]
        [StringLength(20)]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Authors { get; set; }
        public int? ReleaseYear { get; set; }
        public int? NumOfPage { get; set; }
        public float? Size { get; set; }
        public string Language { get; set; }
        [Required]
        [StringLength(50)]
        public string Category { get; set; }
        public string Image { get; set; }
        public int? State { get; set; }
    }
}
