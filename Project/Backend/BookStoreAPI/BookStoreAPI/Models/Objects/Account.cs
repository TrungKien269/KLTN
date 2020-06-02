using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Account
    {
        [Column("ID")]
        public int Id { get; set; }
        [StringLength(100)]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [StringLength(50)]
        public string Salt { get; set; }
        [Required]
        [StringLength(500)]
        public string Email { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedDateTime { get; set; }
        public string State { get; set; }

        [ForeignKey("Id")]
        [InverseProperty("Account")]
        public virtual User IdNavigation { get; set; }
    }
}
