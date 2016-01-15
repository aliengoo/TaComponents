namespace TaComponents.Models
{
    using MongoDB.Bson.Serialization.Attributes;

    public class User : ModelBase
    {
        public string SamAccountName { get; set; }

        public string FirstName { get; set; }

        public string MiddleNames { get; set; }

        [BsonIgnore]
        public string DisplayName => $"{FirstName} {LastName}";

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Extension { get; set; } 
    }
}