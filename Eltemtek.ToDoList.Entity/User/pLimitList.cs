using System.Collections.Generic;

namespace Eltemtek.ToDoList.Entity.Account.User
{
    public class pLimitList
    {
        /// <summary>
        /// Alınacak kayıt sayısı
        /// </summary>
        public int? Take { get; set; }
        /// <summary>
        /// Kayıt kümesi sıçrama indeks numrası
        /// </summary>
        public int? Skip { get; set; }
        /// <summary>
        /// Filtre
        /// </summary>
        public List<pFilter> Filter { get; set; }
        /// <summary>
        /// Sıralama
        /// </summary>
        public List<pSort> Sort { get; set; }
    }
}
