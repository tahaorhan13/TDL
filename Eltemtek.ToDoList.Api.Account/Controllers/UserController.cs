using Eltemtek.ToDoList.Bll.Account;
using Eltemtek.ToDoList.Entity.Account.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

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
            var userId= userD.Get(args);
            if (!String.IsNullOrEmpty(Convert.ToString(userId)))
            {
                HttpContext.Session.SetString("session", Convert.ToString(userId));
                return userId;
            }
            else
                return null;
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
