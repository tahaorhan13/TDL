using System;

namespace Eltemtek.ToDoList.Entity.Account.Auth
{
    public class RecordInfo
    {
        public DateTime Date { get; set; }
        public decimal UserId { get; set; }
        public string IP { get; set; }
        public decimal LanguageId { get; set; }
        public decimal RoleId { get; set; }
        public int AccessLevel { get; set; }

        public RecordInfo()
        {
            this.Date = new DateTime();
            this.UserId = 1;
            this.IP = "127.0.0.1";
            this.LanguageId = 1;
            this.RoleId = 1;
            this.AccessLevel = 0;
        }
    }
}
