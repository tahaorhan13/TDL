using Eltemtek.ToDoList.Dal.Account;
using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account.User;
using System;

namespace Eltemtek.ToDoList.Bll.Account
{
    public class bUser
    {
        public rUser Add(pUser args)
        {
            using(DbEntities db = new DbEntities())
            {
                dUser userD = new dUser(db);

                try
                {
                    return userD.Add(args);
                }
                catch (Exception ex)
                {

                    return new rUser() { Error = true, Message = ex.Message };
                }
            }
        }


        public rUser Update(pUser args)
        {
            using (DbEntities db = new DbEntities())
            {
                dUser userD = new dUser(db);

                try
                {
                    return userD.Update(args);
                }
                catch (Exception ex)
                {

                    return new rUser() { Error = true, Message = ex.Message };
                }

            }
            
        }

        public rUser Get(pbUser args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userD = new dUser(db);

                try
                {
                    return userD.Get(args);
                }
                catch (SystemException)
                {
                    return new rUser() { Error = true, Message = "Error"};
                }
            }
        }
    }
}
