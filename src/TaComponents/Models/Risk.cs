namespace TaComponents.Models
{
    public class Risk
    {
        public string SeverityId { get; set; }

        public string ProbabilityId { get; set; }
        
        public string Description { get; set; }

        public string Mitigation { get; set; }

        public string MitigatedSeverityId { get; set; }
    }
}