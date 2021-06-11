

namespace Eltemtek.ToDoList.Entity.Account.User
{
    public class eUser:eCore
    {
        //public decimal Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public decimal? UserId { get; set; }
    }
}
