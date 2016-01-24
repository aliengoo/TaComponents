using System.Collections.Generic;

namespace TaComponents.Models
{
    public class TimeLine
    {
        public string Description { get; set; }

        public List<TimeLineEntry> Entries { get; set; }
    }
}