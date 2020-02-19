using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Order
    {
        public Order()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        [Column("ID")]
        [StringLength(10)]
        public string Id { get; set; }
        [Column("User_ID")]
        public int UserId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedDate { get; set; }
        public int Total { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        [StringLength(100)]
        public string Status { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("Order")]
        public virtual User User { get; set; }
        [InverseProperty("Order")]
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
