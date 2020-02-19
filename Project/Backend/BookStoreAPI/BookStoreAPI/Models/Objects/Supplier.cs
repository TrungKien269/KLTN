using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStoreAPI.Models.Objects
{
    public partial class Supplier
    {
        public Supplier()
        {
            SupplierBook = new HashSet<SupplierBook>();
        }

        [Column("ID")]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [InverseProperty("Supplier")]
        public virtual ICollection<SupplierBook> SupplierBook { get; set; }
    }
}
