using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account;

namespace Eltemtek.ToDoList.Entity.Note.Note
{
    public class rNote:rCore
    {
        public TblNote Value { get; set; }
    }
}
