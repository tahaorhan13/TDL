using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace Eltemtek.ToDoList.Dal.Account
{
    public static class Extensions
    {
        public static object getPropertyValue(this object val, string propName)
        {
            var prop = val.GetType().GetProperty(propName);

            if (prop == null)
                return null;

            return val.getPropertyValue(prop);
        }
        public static string encrypt(this string val, string key)
        {
            return new Crypto(key).Encrypt(val);
        }

        public static string encrypt(this string val)
        {
            return val.encrypt(null);
        }
        public static bool isGreaterThanZero(this decimal? val)
        {
            return val.HasValue && val.Value > 0 ? true : false;
        }
        public static bool isNotEmpty(this string val)
        {
            return val.isEmpty() ? false : true;
        }
        public static bool isNotNull(this object val)
        {
            return val != null && val != DBNull.Value;
        }

        public static bool hasProperty(this object val, string propName)
        {
            var prop = val.GetType().GetProperty(propName);

            return prop.isNotNull();
        }

        public static bool isGreaterThanZero(this int val)
        {
            return val > 0 ? true : false;
        }
        public static decimal? toDecimal(this object val)
        {
            decimal? result = null;

            try
            {
                if (val != null && val != DBNull.Value)
                    result = Convert.ToDecimal(val);
            }
            catch (Exception)
            {
                //
            }

            return result;
        }

        public static bool hasValidationError(this object obj)
        {
            return obj.getValidationErrors().Any();
        }

        public static object getPropertyValue(this object val, PropertyInfo prop)
        {
            object result = null;

            if (!prop.CanRead)
                return result;

            result = prop.GetValue(val, null);

            if (result == DBNull.Value)
                result = null;

            if (result != null)
            {
                if (result.GetType().IsEnum)
                    result = (int)result;
            }

            return result;
        }

        public static PropertyInfo[] getProperties(this object val)
        {
            return val.GetType().GetProperties();
        }

        public static IEnumerable<ValidationResult> getValidationErrors(this object obj)
        {
            var validationResults = new List<ValidationResult>();
            var context = new ValidationContext(obj, null, null);
            Validator.TryValidateObject(obj, context, validationResults, true);
            return validationResults;
        }

        public static void trimValues(this object val)
        {
            PropertyInfo[] props = val.getProperties();

            foreach (var prop in props)
            {
                if (prop.PropertyType == typeof(string))
                {
                    object propVal = val.getPropertyValue(prop);

                    if (propVal == null)
                        continue;

                    string str = propVal.ToString().Trim();

                    if (!str.isEmpty())
                        val.setPropertyValue(prop, str);
                }
            }
        }

        public static bool isEmpty(this string val)
        {
            return val == String.Empty || String.IsNullOrEmpty(val) || val.Replace(" ", "")
                .Replace("\t", "")
                .Replace("\r", "")
                .Replace("\n", "") == ""
                ? true
                : false;
        }
        public static bool isNullable(this PropertyInfo prop)
        {
            return !prop.PropertyType.IsValueType || prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? true : false;
        }
        public static bool? toBoolean(this object val)
        {
            bool? result = null;

            try
            {
                if (val != null && val != DBNull.Value)
                    result = Convert.ToBoolean(val);
            }
            catch (Exception)
            {
                //
            }

            return result;
        }
        public static bool toBooleanDefault(this object val, bool defaultValue)
        {
            bool? result = val.toBoolean();
            return result == null ? defaultValue : result.Value;
        }

        public static bool toBooleanDefault(this object val)
        {
            return val.toBooleanDefault(false);
        }
        public static void setPropertyValue(this object obj, PropertyInfo prop, object val)
        {
            if (val == DBNull.Value)
                val = null;

            if (val == null && prop.isNullable())
            {
                prop.SetValue(obj, null, null);
                return;
            }

            Type propType = prop.PropertyType;
            Type type;

            if (propType.IsGenericType && propType.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                type = Nullable.GetUnderlyingType(propType);
            }
            else if (propType.IsEnum)
            {
                type = propType;
                val = Enum.ToObject(type, val);
            }
            else
            {
                type = propType;
            }

            if (prop.PropertyType == typeof(bool))
            {
                val = val.toBooleanDefault();
            }

            prop.SetValue(obj, Convert.ChangeType(val, type), null);
        }

        public static void transferValues(this object obj, object objDestination)
        {
            PropertyInfo[] propsSrc = obj.getProperties();
            PropertyInfo[] propsDes = objDestination.getProperties();

            foreach (PropertyInfo prop in propsSrc)
            {
                object val = obj.getPropertyValue(prop);

                if (prop.Name == "Id" && val == null)
                    continue;

                if (val == null)
                {
                    if (!prop.isNullable())
                        continue;
                }

                PropertyInfo pDes = Array.Find<PropertyInfo>(propsDes, p => p.Name == prop.Name);

                if (pDes == null)
                    continue;

                objDestination.setPropertyValue(pDes, val);
            }
        }
    }
}
