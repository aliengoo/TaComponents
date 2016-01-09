using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json.Linq;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    using TaComponents.Models.View;
    using TaComponents.Repositories.Database;

    [Route("api/thing")]
    public class ThingController : Controller
    {
        private readonly IThingRepository _thingRepository;

        public ThingController(IThingRepository thingRepository)
        {
            _thingRepository = thingRepository;
        }

        [HttpGet("{id}")]
        public Task<Thing> Get(string id)
        {
            return _thingRepository.FindByIdAsync(id);
        }

        [HttpPost]
        public Task<Thing> Post([FromBody]Thing thing)
        {
            return _thingRepository.InsertAsync(thing);
        }

        [HttpPut("{id}")]
        public Task<Thing> Put([FromRoute]string id, [FromBody] Thing thing)
        {
            return _thingRepository.UpdateAsync(thing);
        }

        [HttpDelete("{id}")]
        public Task Delete(string id)
        {
            return _thingRepository.DeleteAsync(id);
        }

        [HttpPost("query")]
        public Task<List<Thing>> Find(JObject query)
        {
            var queryDoc = BsonDocument.Parse(query.ToString());
            return _thingRepository.FindAsync(queryDoc);
        }

        [HttpGet("is-name-unique")]
        public async Task<HttpStatusCodeResult> IsNameUnique([FromQuery] string name, [FromQuery] string id)
        {
            var isUnique = await _thingRepository.IsNameUnique(name);

            // ok or conflict
            return isUnique ? Ok() : new HttpStatusCodeResult(409);
        }

        [HttpGet("name-search")]
        public Task<List<SelectOption>> NameSearch([FromQuery] string q)
        {
            return _thingRepository.NameSearch(q);
        }
    }
}
