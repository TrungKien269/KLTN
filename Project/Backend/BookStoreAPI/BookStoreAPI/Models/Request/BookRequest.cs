using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Request
{
    public class BookRequest
    {
        [StringLength(20)]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int OriginalPrice { get; set; }
        public int CurrentPrice { get; set; }
        public int? ReleaseYear { get; set; }
        public float? Weight { get; set; }
        public int? NumOfPage { get; set; }
        [Required]
        public string Image { get; set; }
        public string Summary { get; set; }
        [Required]
        [StringLength(100)]
        public string Status { get; set; }
    }
}
