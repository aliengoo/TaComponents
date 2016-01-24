using System;

namespace TaComponents.Models
{
    public class TimeLineEntry
    {
        public string Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? ExpectedEndDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        public bool Completed { get; set; }
    }
}