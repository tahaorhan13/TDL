using Eltemtek.ToDoList.Db.DataAccess;

namespace Eltemtek.ToDoList.Dal.Account
{
    public abstract class dCore
    {
        protected DbEntities db;
        public dCore(DbEntities db)
        {
            this.db = db;
        }
    }
}
