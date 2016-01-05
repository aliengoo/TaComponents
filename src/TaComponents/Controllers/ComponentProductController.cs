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

    [Route("api/product")]
    public class ComponentProductController : Controller
    {
        private readonly IRepository<ComponentProduct> _componentProductRepository;

        public ComponentProductController(IRepository<ComponentProduct> componentProductRepository)
        {
            _componentProductRepository = componentProductRepository;
        }

        [HttpGet("{id}")]
        public Task<ComponentProduct> Get(string id)
        {
            return _componentProductRepository.FindById(id);
        }

        [HttpPost]
        public Task<ComponentProduct> Post([FromBody]ComponentProduct componentProduct)
        {
            return _componentProductRepository.Insert(componentProduct);
        }

        [HttpPut("{id}")]
        public Task<ComponentProduct> Put([FromRoute]string id, [FromBody] ComponentProduct componentProduct)
        {
            return _componentProductRepository.Update(componentProduct);
        }

        [HttpDelete("{id}")]
        public Task Delete(string id)
        {
            return _componentProductRepository.Delete(id);
        }

        [HttpPost("query")]
        public Task<List<ComponentProduct>> Find(JObject query)
        {
            var queryDoc = BsonDocument.Parse(query.ToString());
            return _componentProductRepository.Find(queryDoc);
        }
    }
}
