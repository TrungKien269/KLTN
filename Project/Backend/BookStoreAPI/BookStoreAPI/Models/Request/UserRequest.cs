using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Models.Request
{
    public class UserRequest
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        [StringLength(20)]
        public string Gender { get; set; }
        public DateTime Birthday { get; set; }
        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        public AccountRequest AccountRequest { get; set; }
    }
}
