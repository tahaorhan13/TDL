using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Entity.Account.UserToken
{
    public class pbUserToken
    {
        public decimal? Id { get; set; }
        public decimal? Userid { get; set; }
        public string RefreshToken { get; set; }
    }
}
