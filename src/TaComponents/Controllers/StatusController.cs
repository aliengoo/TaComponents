using System;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MongoDB.Bson;

    using TaComponents.Repositories.Database;

    [Route("api/status")]
    public class StatusController : Controller
    {
        private readonly IDataRepository<Status> _componentProductStatusRepository;

        public StatusController(IDataRepository<Status> componentProductStatusRepository)
        {
            _componentProductStatusRepository = componentProductStatusRepository;
        }

        [HttpGet]
        public Task<List<Status>> Get()
        {
            return _componentProductStatusRepository.FindAsync(new BsonDocument());
        }
    }
}