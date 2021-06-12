using System.Collections.Generic;

namespace Eltemtek.ToDoList.Entity.Account.Auth
{
    public class TokenOptions
    {
        public const string TokenOption = "TokenOption";
        public List<string> Audience { get; set; }
        public string Issuer { get; set; }
        public int AccessTokenExpiration { get; set; }
        public int RefreshTokenExpiration { get; set; }
        public string SecurityKey { get; set; }
    }
}
