using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Eltemtek.ToDoList.Db.DataAccess
{
    [Table("tbl_note")]
    [Index(nameof(Userid), Name = "fki_id_userid_foreign")]
    public partial class TblNote
    {
        [Key]
        public int Noteid { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        [Required]
        [StringLength(100)]
        public string Note { get; set; }
        public decimal Userid { get; set; }

        [ForeignKey(nameof(Userid))]
        [InverseProperty(nameof(TblUser.TblNotes))]
        public virtual TblUser User { get; set; }
    }
}
