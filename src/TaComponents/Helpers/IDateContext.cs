using System;

namespace TaComponents.Helpers
{
    public interface IDateContext
    {
        DateTime Now { get; }
        DateTime Today { get; }
    }
}