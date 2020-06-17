using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    [Table("EBookPayment")]
    public partial class EbookPayment
    {
        [Key]
        [Column("PaymentID")]
        [StringLength(50)]
        public string PaymentId { get; set; }
        [Column("PolicyID")]
        public int PolicyId { get; set; }
        [Column("User_ID")]
        public int UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime RentedDate { get; set; }

        [ForeignKey("PolicyId")]
        [InverseProperty("EbookPayment")]
        public EbookRentalPolicy Policy { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("EbookPayment")]
        public UserEbook User { get; set; }
    }
}
