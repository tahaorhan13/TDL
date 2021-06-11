using Eltemtek.ToDoList.Bll.Account;
using Eltemtek.ToDoList.Entity.Account.Auth;
using Eltemtek.ToDoList.Entity.Account.User;
using Eltemtek.ToDoList.Entity.Account.UserToken;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Eltemtek.ToDoList.Api.Account.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public rToken Login(pUser args)
        {
            var tokenB = new bUserToken(_configuration);

            return tokenB.Login(args);
        }

        [HttpPost]
        public rToken CreateTokenByRefreshToken(pbUserToken args)
        {
            var tokenB = new bUserToken(_configuration);

            return tokenB.CreateTokenByRefreshToken(args);
        }

        [HttpPost]
        public rToken RevokeRefreshToken(pbUserToken args)
        {
            var tokenB = new bUserToken(_configuration);

            return tokenB.RevokeRefreshToken(args);
        }




    }
}
