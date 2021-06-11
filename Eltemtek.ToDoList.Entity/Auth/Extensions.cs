using Microsoft.AspNetCore.Mvc;
using System;

namespace Eltemtek.ToDoList.Entity.Account.Auth
{
    public static class Extensions
    {
        public static string VersionedContent(this IUrlHelper urlHelper, string path)
        {
            return urlHelper.Content($"{path}?v={GuidGenerator.Create()}");
        }
    }

    public static class GuidGenerator
    {
        /// <summary>
        /// Global benzersiz tanımlama değeri üretir
        /// </summary>
        /// <param name="upperCase">Büyük harf</param>
        /// <param name="hyphens">Aralarda - karakteri</param>
        /// <returns></returns>
        public static string Create(bool upperCase, bool hyphens)
        {
            string guid = Guid.NewGuid().ToString();

            if (!hyphens)
                guid = guid.Replace("-", "");

            if (upperCase)
                return guid.ToUpper();
            else
                return guid.ToLower();
        }

        /// <summary>
        /// Global benzersiz tanımlama değeri üretir
        /// </summary>
        /// <returns></returns>
        public static string Create() => Create(false, false);
    }
}
