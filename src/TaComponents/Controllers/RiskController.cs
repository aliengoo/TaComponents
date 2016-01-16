using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using System.Threading.Tasks;

    using MongoDB.Bson;

    using TaComponents.Repositories.Database;

    [Route("api/[controller]")]
    public class RiskController : Controller
    {
        private readonly IDataRepository<RiskSeverity> _riskSeverityRepository;
        private readonly IDataRepository<RiskProbability> _riskProbabilityRepository;

        public RiskController(
            IDataRepository<RiskSeverity> riskSeverityRepository,
            IDataRepository<RiskProbability> riskProbabilityRepository)
        {
            _riskSeverityRepository = riskSeverityRepository;
            _riskProbabilityRepository = riskProbabilityRepository;
        }

        [HttpGet("severities")]
        public Task<List<RiskSeverity>> GetSeverities()
        {
            return _riskSeverityRepository.FindAsync(new BsonDocument());
        }

        [HttpGet("probabilities")]
        public Task<List<RiskProbability>> GetProbabilities()
        {
            return _riskProbabilityRepository.FindAsync(new BsonDocument());
        }
    }
}