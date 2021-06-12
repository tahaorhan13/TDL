using System;
using System.ComponentModel.DataAnnotations;

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
