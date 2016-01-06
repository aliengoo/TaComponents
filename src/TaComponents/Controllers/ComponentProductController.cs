using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using Repositories;

    using TaComponents.Repositories.Database;

    [Route("api/product")]
    public class ComponentProductController : Controller
    {
        private readonly IDataRepository<ComponentProduct> _componentProductRepository;

        public ComponentProductController(IDataRepository<ComponentProduct> componentProductRepository)
        {
            _componentProductRepository = componentProductRepository;
        }

        [HttpGet("{id}")]
        public Task<ComponentProduct> Get(string id)
        {
            return _componentProductRepository.FindByIdAsync(id);
        }

        [HttpPost]
        public Task<ComponentProduct> Post([FromBody]ComponentProduct componentProduct)
        {
            return _componentProductRepository.InsertAsync(componentProduct);
        }

        [HttpPut("{id}")]
        public Task<ComponentProduct> Put([FromRoute]string id, [FromBody] ComponentProduct componentProduct)
        {
            return _componentProductRepository.UpdateAsync(componentProduct);
        }

        [HttpDelete("{id}")]
        public Task Delete(string id)
        {
            return _componentProductRepository.DeleteAsync(id);
        }

        [HttpPost("query")]
        public Task<List<ComponentProduct>> Find(JObject query)
        {
            var queryDoc = BsonDocument.Parse(query.ToString());
            return _componentProductRepository.FindAsync(queryDoc);
        }
    }
}
