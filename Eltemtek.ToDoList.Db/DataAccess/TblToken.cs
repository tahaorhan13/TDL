using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Eltemtek.ToDoList.Db.DataAccess
{
    [Table("tbl_token")]
    public partial class TblToken
    {
        [Key]
        public int Id { get; set; }
        public decimal Userid { get; set; }
        [Required]
        public string RefreshToken { get; set; }
        [Column(TypeName = "timestamp with time zone")]
        public DateTime RefreshTokenExpireDate { get; set; }
    }
}
