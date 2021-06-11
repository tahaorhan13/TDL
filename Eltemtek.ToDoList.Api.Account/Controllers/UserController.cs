using Eltemtek.ToDoList.Bll.Account;
using Eltemtek.ToDoList.Entity.Account.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eltemtek.ToDoList.Api.Account.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        [Route("Login")]
        public rUser Get(pbUser args)
        {
            bUser userD = new bUser();
            return userD.Get(args);
        }

        [HttpPost]
        [Route("Add")]
        public rUser Add(pUser args)
        {
            bUser user = new bUser();

            return user.Add(args);
        }


        [HttpPost]
        [Route("Update")]
        public rUser Update(pUser args)
        {
            bUser user = new bUser();

            return user.Update(args);
        }
        
    }
}
