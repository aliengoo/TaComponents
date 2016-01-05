using Microsoft.AspNet.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json.Linq;

namespace TaComponents.Controllers
{
    [Route("api/[controller]")]
    public class HelloController
    {
        public object Get()
        {
            return new
            {
                Message = "Hello, World!"
            };
        }

        [HttpPost]
        public object Post([FromBody]JObject j)
        {
            j.Add("Hello", "Hello, World!");
            var x = BsonDocument.Parse(j.ToString());
            return JObject.Parse(x.ToJson());
        }
    }
}