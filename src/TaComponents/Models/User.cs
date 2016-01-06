namespace TaComponents.Models
{
    public class User : ModelBase
    {
        public string SamAccountName { get; set; }

        public string FirstName { get; set; }

        public string MiddleNames { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Extension { get; set; } 
    }
}