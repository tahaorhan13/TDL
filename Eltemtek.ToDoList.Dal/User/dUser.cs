using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account.User;
using System;
using System.Linq;

namespace Eltemtek.ToDoList.Dal.Account
{
    public class dUser : dCore
    {
        public dUser(DbEntities db) : base(db)
        {
            //
        }
        public rUser Add(pUser args)
        {
            try
            {
                if (!Has(args.Email))
                    return new rUser { Error = true, Message = "Kullanıcı zaten kayıtlı" };
                TblUser user = new TblUser()
                {
                    Name = args.Name,
                    Surname = args.Surname,
                    Password = args.Password,
                    Email = args.Email
                };
                db.TblUsers.Add(user);
                db.SaveChanges();

                var eUser = new eUser()
                {
                    Name = args.Name,
                    Surname = args.Surname,
                    Password = args.Password,
                    Email = args.Email

                };
                return new rUser { Value = eUser };


            }
            catch (Exception ex)
            {
                return new rUser { Error = true, Message = ex.Message };
            }
        }

        //Kullancı Silme Metodu Id den yakalayıp veritabanından sildik..//
        public rUser Delete(pUser args)
        {
            try
            {
                var user = db.TblUsers.Where(x => x.Id == args.Id).SingleOrDefault();
                db.TblUsers.Remove(user);
                db.SaveChanges();
                return new rUser();
            }
            catch (Exception ex)
            {
                return new rUser { Error = true, Message = ex.Message };
            }
        }
        //Kullancı Güncelleme Metodu Id den kullanıcıyı bulup güncellenecek kısımı yaptık..//
        public rUser Update(pUser args)
        {
            try
            {
                var user = db.TblUsers.Where(x => x.Id == args.Id).SingleOrDefault();
                user.Password = args.Password;
                db.TblUsers.Update(user);
                db.SaveChanges();
                return new rUser();
            }
            catch (Exception ex)
            {
                return new rUser { Error = true, Message = ex.Message };
            }

        }


        //E-Mail kontrol metodu veritabanında daha önce oluşturulmuş mu diye kontrol ediyor..//
        private bool Has(string email)
        {
            try
            {
                var user = db.TblUsers.Where(x => x.Email == email).SingleOrDefault();
                return user == null ? true : false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public rUser Login(pUser args)
        {
            try
            {
                var user = db.TblUsers.Where(x => x.Email == args.Email && x.Password == args.Password).SingleOrDefault();
                var eUser = new eUser()
                {
                    Id = user.Id,
                    Email = user.Email
                };
                return new rUser() { Value = eUser };
            }
            catch (Exception)
            {
                return new rUser() { Error = true, Message = "dsa" };
            }
        }

        private IQueryable<eUser> GenerateQuery()
        {
            return (from user in db.TblUsers
                    select new eUser()
                    {
                        Id = user.Id,
                        Name = user.Name,
                        Surname = user.Surname,
                        Email = user.Email,
                        Password = user.Password
                    });
        }


        public rUser Get(pbUser args)
        {
            //if (args.Id.isEqualOrLessThanZero())
            //    throw new SystemException(Messages.Codes._101, Messages.SystemCodes.INCORRECT_OR_MISSING_PARAMETER_VALUE);

            var q = GenerateQuery();

            if (args.Id.isGreaterThanZero())
                q = q.Where(w => w.Id == args.Id);

            if (args.Email.isNotEmpty())
                q = q.Where(w => w.Email == args.Email);

            if (args.Password.isNotEmpty())
            {
                args.Password = args.Password;
                var r = db.TblUsers.Where(w => w.Email == args.Email && w.Password == args.Password).Any();

                if (!r)
                    return new rUser();
            }

            try
            {
                return new rUser() { Value = q.SingleOrDefault() };
            }
            catch (Exception)
            {
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.DEFAULT_ERROR, ex");
            }
        }
    }
}
