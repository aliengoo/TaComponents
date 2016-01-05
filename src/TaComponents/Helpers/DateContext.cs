using System;

namespace TaComponents.Helpers
{
    public class DateContext : IDateContext
    {
        public DateTime Now => DateTime.UtcNow;

        public DateTime Today => DateTime.UtcNow.Date;
    }
}