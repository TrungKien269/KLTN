using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    [Table("UserEBook")]
    public partial class UserEbook
    {
        public UserEbook()
        {
            EbookPayment = new HashSet<EbookPayment>();
        }

        [Key]
        [Column("User_ID")]
        public int UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ExpiredDate { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("UserEbook")]
        public User User { get; set; }
        [InverseProperty("User")]
        public ICollection<EbookPayment> EbookPayment { get; set; }
    }
}
