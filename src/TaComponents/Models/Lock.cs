namespace TaComponents.Models
{
    public class Lock : ModelBase
    {
        public string ProductId { get; set; }

        public string LockedBy { get; set; }
    }
}