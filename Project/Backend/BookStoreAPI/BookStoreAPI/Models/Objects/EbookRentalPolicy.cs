using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    [Table("EBookRentalPolicy")]
    public partial class EbookRentalPolicy
    {
        public EbookRentalPolicy()
        {
            EbookPayment = new HashSet<EbookPayment>();
        }

        [Column("ID")]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public int NumberRentedDay { get; set; }
        public int Price { get; set; }

        [InverseProperty("Policy")]
        public ICollection<EbookPayment> EbookPayment { get; set; }
    }
}
