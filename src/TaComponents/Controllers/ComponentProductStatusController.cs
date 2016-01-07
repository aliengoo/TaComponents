using System;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MongoDB.Bson;

    using TaComponents.Repositories.Database;

    [Route("api/component-product-status")]
    public class ComponentProductStatusController : Controller
    {
        private readonly IDataRepository<ComponentProductStatus> _componentProductStatusRepository;

        public ComponentProductStatusController(IDataRepository<ComponentProductStatus> componentProductStatusRepository)
        {
            _componentProductStatusRepository = componentProductStatusRepository;
        }

        [HttpGet]
        public Task<List<ComponentProductStatus>> Get()
        {
            return _componentProductStatusRepository.FindAsync(new BsonDocument());
        }
    }
}