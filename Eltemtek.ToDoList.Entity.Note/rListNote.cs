using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account;
using System.Collections.Generic;

namespace Eltemtek.ToDoList.Entity.Note.Note
{
    public class rListNote:rCore
    {
        public List<TblNote> Values { get; set; }
    }
}
