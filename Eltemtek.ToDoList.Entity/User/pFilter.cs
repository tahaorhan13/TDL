using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Entity.Account.User
{
    public class pFilter
    {
        public string Field { get; set; }
        /// <summary>
        /// Karşılaştırma operatörü
        /// </summary>
        public string Operator { get; set; }
        /// <summary>
        /// Değer
        /// </summary>
        public object Value { get; set; }
    }
}
