namespace TaComponents.Exceptions
{
    using System;

    public class QueryException : Exception
    {
        public QueryException()
        {
        }

        public QueryException(string message)
            : base(message)
        {
        }

        public QueryException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}