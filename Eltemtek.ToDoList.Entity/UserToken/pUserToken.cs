using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Entity.Account.UserToken
{
    public class pUserToken
    {
        public decimal? Id { get; set; }
        [Required]
        public decimal? Userid { get; set; }
        [Required]
        [MaxLength(300)]
        public string RefreshToken { get; set; }
        [Required]
        public DateTime RefreshTokenExpireDate { get; set; }
    }
}
