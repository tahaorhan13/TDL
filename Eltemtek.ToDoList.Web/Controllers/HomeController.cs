using Microsoft.AspNetCore.Mvc;

namespace Eltemtek.ToDoList.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UpdateNote()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        public IActionResult Profile()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult NoteList()
        {
            return View();
        }
    }
}
