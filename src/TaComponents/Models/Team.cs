using System.Collections.Generic;

namespace TaComponents.Models
{
    public class Team
    {
        public string Title { get; set; }

        public List<string> Members { get; set; }

        public List<string> Roles { get; set; }
    }
}