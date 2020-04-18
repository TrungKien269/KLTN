using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public class SearchHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("UserID")]
        public int UserId { get; set; }
        [Required]
        public string Words { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime DateTime { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("SearchHistory")]
        public User User { get; set; }
    }
}
