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
    using Ploeh.AutoFixture;

    using Repositories;

    using TaComponents.Models.View;
    using TaComponents.Repositories.Database;

    [Route("api/component-product")]
    public class ComponentProductController : Controller
    {
        private readonly IComponentProductRepository _componentProductRepository;

        public ComponentProductController(IComponentProductRepository componentProductRepository)
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

        [HttpGet("is-name-unique")]
        public async Task<HttpStatusCodeResult> IsNameUnique([FromQuery] string name, [FromQuery] string id)
        {
            var isUnique = await _componentProductRepository.IsNameUnique(name);

            // ok or conflict
            return isUnique ? Ok() : new HttpStatusCodeResult(409);
        }

        [HttpGet("name-search")]
        public Task<List<SelectOption>> NameSearch([FromQuery] string q)
        {
            return _componentProductRepository.NameSearch(q);
        }
    }
}
