using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using System.Threading.Tasks;

    using MongoDB.Bson;

    using TaComponents.Repositories.Database;

    [Route("api/risk-level")]
    public class RiskLevelController : Controller
    {
        private readonly IDataRepository<RiskLevel> _riskLevelRepository;

        public RiskLevelController(IDataRepository<RiskLevel> riskLevelRepository)
        {
            _riskLevelRepository = riskLevelRepository;
        }

        [HttpGet]
        public Task<List<RiskLevel>> Get()
        {
            return _riskLevelRepository.FindAsync(new BsonDocument());
        } 
    }
}