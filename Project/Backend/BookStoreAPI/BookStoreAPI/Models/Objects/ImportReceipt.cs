using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Objects
{
    public partial class ImportReceipt
    {
        [Column("ID")]
        [StringLength(20)]
        public string Id { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime ImportDate { get; set; }
        public long Total { get; set; }
    }
}
