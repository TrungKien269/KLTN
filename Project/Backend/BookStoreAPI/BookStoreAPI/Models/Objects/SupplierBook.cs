using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class SupplierBook
    {
        [Column("Book_ID")]
        [StringLength(20)]
        public string BookId { get; set; }
        [Column("Supplier_ID")]
        public int SupplierId { get; set; }

        [ForeignKey("BookId")]
        [InverseProperty("SupplierBook")]
        public virtual Book Book { get; set; }
        [ForeignKey("SupplierId")]
        [InverseProperty("SupplierBook")]
        public virtual Supplier Supplier { get; set; }
    }
}
