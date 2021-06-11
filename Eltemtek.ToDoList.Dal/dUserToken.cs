using Eltemtek.ToDoList.Dal.Account.Token;
using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account;
using Eltemtek.ToDoList.Entity.Account.User;
using Eltemtek.ToDoList.Entity.Account.UserToken;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Dal.Account
{
    public class dUserToken:dCore
    {
        public dUserToken(DbEntities db):base(db)
        {
            //
        }

        private bool Has(pUserToken args)
        {
            args.validateValues(false);

            try
            {
                return db.TblTokens.Where(w => w.RefreshToken == args.RefreshToken).Any();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private bool HasDifferent(pUserToken args)
        {
            args.validateValues(true);

            try
            {
                return db.TblTokens.Where(w => w.Id != args.Userid && w.Userid == args.Userid).Any();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private IQueryable<eUserToken> GenerateQuery()
        {
            return (from userToken in db.TblTokens
                    select new eUserToken()
                    {
                        Id = userToken.Id,
                        UserId = userToken.Userid,
                        RefreshToken = userToken.RefreshToken,
                        RefreshTokenExpireDate = userToken.RefreshTokenExpireDate
                    });
        }
        private TblToken GetEntity(pId args)
        {
            if (args.Id.isEqualOrLessThanZero())
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.HAS_RECORD");

            try
            {
                return db.TblTokens.Where(w => w.Id == args.Id).SingleOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public rUserToken Get(pbUserToken args)
        {

            var q = GenerateQuery();

            if (args.Userid.isGreaterThanZero())
                q = q.Where(w => w.Id == args.Userid);

            if (args.Userid.isGreaterThanZero())
                q = q.Where(w => w.UserId == args.Userid);

            if (args.RefreshToken.isNotNull())
                q = q.Where(w => w.RefreshToken == args.RefreshToken);

            try
            {
                return new rUserToken() { Value = q.SingleOrDefault() };
            }
            catch (Exception)
            {
                throw;
            }
        }
        public rUserToken Add(pUserToken args)
        {
            if (Has(args))
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.HAS_RECORD");

            var ent = new TblToken();

            try
            {
                ent.addEntity(db, args);
            }
            catch (Exception)
            {
                throw;
            }

            var r = Get(new pbUserToken() { Userid = ent.Id });
            return r;
        }
        public rUserToken Update(pUserToken args)
        {
            if (HasDifferent(args))
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.HAS_RECORD");

            var ent = GetEntity(new pId() { Id = args.Userid });

            try
            {
                ent.updateEntity(db, args);
            }
            catch (Exception)
            {
                throw;
            }

            var r = Get(new pbUserToken() { Userid = ent.Id });
            return r;
        }
        public rUserToken Save(pUserToken args)
        {
            return args.Userid.isGreaterThanZero() ? Update(args) : Add(args);
        }
        public rCore Delete(pId args)
        {
            if (args.Id.isEqualOrLessThanZero())
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.INCORRECT_OR_MISSING_PARAMETER_VALUE");

            var ent = GetEntity(args);

            try
            {
                ent.removeEntity(db, args);
            }
            catch (Exception)
            {
                throw;
            }

            return null;
        }
        public rListUserToken List(pListUserToken args)
        {
            var q = GenerateQuery();

            if (args.hasNotSort())
                q = q.OrderBy(o => o.Id);

            q = q.addFilterQuery(args).addSortQuery(args);

            try
            {
                return new rListUserToken() { Value = q.addSkipTakeQuery(args).ToList(), Total = q.Count() };
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
