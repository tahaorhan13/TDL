using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Eltemtek.ToDoList.Db.DataAccess
{
    [Table("tbl_user")]
    public partial class TblUser
    {
        public TblUser()
        {
            TblNotes = new HashSet<TblNote>();
        }

        [Key]
        [Column("id")]
        public decimal Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(100)]
        public string Surname { get; set; }
        [Required]
        [StringLength(100)]
        public string Email { get; set; }
        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [InverseProperty(nameof(TblNote.User))]
        public virtual ICollection<TblNote> TblNotes { get; set; }
    }
}
