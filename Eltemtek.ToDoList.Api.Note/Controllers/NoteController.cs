using Eltemtek.ToDoList.Bll.Note;
using Eltemtek.ToDoList.Entity.Note.Note;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Eltemtek.ToDoList.Api.Note.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        [HttpPost]
        [Route("Get")]
        public rNote Get(pNote args)
        {
            bNote note = new bNote();

            return note.Get(args);
        }


        [HttpPost]
        [Route("Add")]
        public rNote Add(pNote args)
        {
            args.UserId = Convert.ToInt32(HttpContext.Session.GetString("session"));

            bNote note = new bNote();

            return note.Add(args);

        }


        [HttpPost]
        [Route("Update")]
        public rNote Update(pNote args)
        {
            bNote note = new bNote();

            return note.Update(args);
        }


        [HttpPost]
        [Route("Delete")]
        public rNote Delete(pNote args)
        {
            bNote note = new bNote();

            return note.Delete(args);
        }

        [HttpPost]
        [Route("List")]
        public rListNote List(pNote args)
        {
            bNote noteD = new bNote();

            return noteD.List(args);
        }
    }
}
