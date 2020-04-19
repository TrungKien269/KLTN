using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class FaceBookAccount
    {
        [Column("ID")]
        public int Id { get; set; }
        [Required]
        [Column("FaceBookID")]
        [StringLength(50)]
        public string FaceBookId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedDateTime { get; set; }

        [ForeignKey("Id")]
        [InverseProperty("FaceBookAccount")]
        public virtual User IdNavigation { get; set; }
    }
}
