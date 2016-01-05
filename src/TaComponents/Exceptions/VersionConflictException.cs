using System;

namespace TaComponents.Exceptions
{
    public class VersionConflictException : Exception
    {
        public VersionConflictException()
        {
        }

        public VersionConflictException(string message) : base(message)
        {
        }

        public VersionConflictException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}