using System;

namespace Eltemtek.ToDoList.Entity.Account.UserToken
{
    public class eUserToken:eCore
    {
        public decimal UserId { get; set; }
        public string AccessToken { get; set; }
        public DateTime AccessTokenExpireDate { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpireDate { get; set; }
    }
}
