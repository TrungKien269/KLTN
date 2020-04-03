using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public class RawBook
    {
        [Column("ID")]
        [StringLength(20)]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int Price { get; set; }
        public string Supplier { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public int? ReleaseYear { get; set; }
        public float? Weight { get; set; }
        public int? NumOfPage { get; set; }
        public string Form { get; set; }
        public string Image { get; set; }
        public string Summary { get; set; }
    }
}
