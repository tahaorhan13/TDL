using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account.Auth;
using Eltemtek.ToDoList.Entity.Account.User;
using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Dal.Account.Token
{
    public static class Extensions
    {
        public static void validateValues(this object args, bool updateFunc)
        {
            decimal? id = args.getPropertyValue("Id").toDecimal();

            if (args.hasValidationError())
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.INCORRECT_OR_MISSING_PARAMETER_VALUE");
            if (updateFunc && id.isEqualOrLessThanZero())
                throw new SystemException("Messages.Codes._101, Messages.SystemCodes.INCORRECT_OR_MISSING_PARAMETER_VALUE");
        }

        public static bool isEqualOrLessThanZero(this decimal? val)
        {
            return !val.HasValue || val.Value <= 0 ? true : false;
        }

        public static bool isEqualOrLessThanZero(this decimal val)
        {
            return val <= 0 ? true : false;
        }

        public static bool isGreaterThanZero(this decimal? val)
        {
            return val.HasValue && val.Value > 0 ? true : false;
        }

        public static bool isNotNull(this object val)
        {
            return val != null && val != DBNull.Value;
        }

        public static decimal addEntity<TEntity>(this TEntity ent, DbEntities db, object args) where TEntity : class
        {
            if (args != null)
            {
                args.trimValues();

                if (args.hasValidationError())
                    throw new SystemException("Messages.Codes._100, Messages.Titles.Error, Messages.Descriptions.INCORRECT_OR_MISSING_PARAMETER_VALUE");

                args.transferValues(ent);
            }

            db.Set<TEntity>().Add(ent);
            db.SaveChanges();
            return  0;
        }


        public static decimal updateEntity(this object ent, DbEntities db, object args)
        {
            if (args != null)
            {
                args.trimValues();

                if (args.hasValidationError())
                    throw new SystemException("Messages.Codes._100, Messages.Titles.Error, Messages.Descriptions.INCORRECT_OR_MISSING_PARAMETER_VALUE");

                args.transferValues(ent);
            }

            db.SaveChanges();

            return ent.hasProperty(CommonFields.Id) ? (decimal)ent.getPropertyValue(CommonFields.Id) : 0;
        }


        public static void removeEntity<TEntity>(this TEntity ent, DbEntities db, object args) where TEntity : class
        {
            if (args != null)
                args.transferValues(ent);

            db.Set<TEntity>().Remove(ent);
            db.SaveChanges();
        }
        public static bool hasFilter(this pLimitList args)
        {
            return args.Filter.isNotNull() && args.Filter.Count.isGreaterThanZero() ? true : false;
        }
        public static bool hasSort(this pLimitList args)
        {
            return args.Sort.isNotNull() && args.Sort.Count.isGreaterThanZero() ? true : false;
        }

        public static bool hasNotSort(this pLimitList args)
        {
            return args.hasSort() ? false : true;
        }

        public static bool hasNotFilter(this pLimitList args)
        {
            return args.hasFilter() ? false : true;
        }



        public static IQueryable<T> addFilterQuery<T>(this IQueryable<T> q, pLimitList args)
        {
            if (args.hasNotFilter())
                return q;

            var parameter = Expression.Parameter(typeof(T), "x");
            foreach (var f in args.Filter)
            {
                var prop = typeof(T).GetProperty(f.Field);
                var member = Expression.Property(parameter, prop.Name);
                var converter = TypeDescriptor.GetConverter(prop.PropertyType); // 1
                var propertyValue = converter.ConvertFromInvariantString(f.Value.ToString()); // 3
                var constant = Expression.Constant(propertyValue);
                var valueExpression = Expression.Convert(constant, prop.PropertyType); // 4
                Expression filter = Expression.Equal(member, valueExpression);

                if (f.Operator == Operators.NotEqual || f.Operator == Operators.IsNotNull)
                    filter = Expression.NotEqual(member, valueExpression);
                else if (f.Operator == Operators.StartsWith)
                    filter = Expression.Call(member, typeof(string).GetMethod("StartsWith", new Type[] { typeof(string) }), valueExpression);
                else if (f.Operator == Operators.Contains)
                    filter = Expression.Call(member, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), valueExpression);
                else if (f.Operator == Operators.EndsWith)
                    filter = Expression.Call(member, typeof(string).GetMethod("EndsWith", new Type[] { typeof(string) }), valueExpression);
                else if (f.Operator == Operators.DoesNotContain)
                    filter = Expression.Not(Expression.Call(member, typeof(string).GetMethod("Contains", new Type[] { typeof(string) }), valueExpression));
                else if (f.Operator == Operators.GreaterThan)
                    filter = Expression.GreaterThan(member, valueExpression);
                else if (f.Operator == Operators.GreaterThanOrEqual)
                    filter = Expression.GreaterThanOrEqual(member, valueExpression);
                else if (f.Operator == Operators.LessThan)
                    filter = Expression.LessThan(member, valueExpression);
                else if (f.Operator == Operators.LessThanOrEqual)
                    filter = Expression.LessThanOrEqual(member, valueExpression);

                var lambda = Expression.Lambda<Func<T, bool>>(filter, parameter);
                q = q.Where(lambda);
            }

            return q;
        }

        public static IQueryable<T> addSortQuery<T>(this IQueryable<T> q, pLimitList args)
        {
            if (args.hasNotSort())
                return q;

            foreach (var sort in args.Sort)
            {
                var classPara = Expression.Parameter(typeof(T), "t");
                var pi = typeof(T).GetProperty(sort.Field);
                q = q.Provider.CreateQuery<T>(Expression.Call(typeof(Queryable), sort.Asc ? "OrderBy" : "OrderByDescending", new Type[] { typeof(T), pi.PropertyType }, q.Expression, Expression.Lambda(Expression.Property(classPara, pi), classPara)));
            }

            return q;
        }

        public static IQueryable<T> addSkipTakeQuery<T>(this IQueryable<T> q, pLimitList args)
        {
            if (args.Skip.HasValue)
                q = q.Skip(args.Skip.Value);

            if (args.Take.HasValue)
                q = q.Take(args.Take.Value);

            return q;
        }
    }
}
