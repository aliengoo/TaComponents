namespace TaComponents.Repositories.Database
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using MongoDB.Bson;
    using MongoDB.Driver;

    using TaComponents.Helpers;
    using TaComponents.Models;
    using TaComponents.Models.View;

    public class ComponentProductRepository : MongoRepository<ComponentProduct>, IComponentProductRepository
    {
        public ComponentProductRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
        }

        public ComponentProductRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(collectionName, config, dateContext, userContext)
        {
            // 
            Collection.Indexes.CreateOne(
                Builders<ComponentProduct>.IndexKeys.Ascending(cp => cp.Name), new CreateIndexOptions
                                                                                   {
                                                                                       Name = "name_u",
                                                                                       Unique = true
                                                                                   });

            Collection.Indexes.CreateOne(
                Builders<ComponentProduct>.IndexKeys.Text(cp => cp.Name).Text(cp => cp.Information),
                new CreateIndexOptions { Name = "name_information_text" });
        }

        public async Task<bool> IsNameUnique(string name, string id = null)
        {
            var regex = new BsonRegularExpression($"^{name}$", "i");
            var query = new BsonDocument { { "Name", regex } };

            // for existing products exclude itself
            if (!string.IsNullOrWhiteSpace(id))
            {
                query.Add("_id", new BsonDocument { { "$ne", id } });
            }

            var count = await Collection.CountAsync(new BsonDocumentFilterDefinition<ComponentProduct>(query));

            return count == 0;
        }

        public async Task<List<SelectOption>> NameSearch(string search)
        {
            // must start with search
            var regex = new BsonRegularExpression($"^{search}", "i");
            var query = new BsonDocument { { "Name", regex } };

            var results = new List<SelectOption>();

            using (var cursor = await Collection.FindAsync(new BsonDocumentFilterDefinition<ComponentProduct>(query)))
            {
                while (await cursor.MoveNextAsync())
                {
                    results.AddRange(cursor.Current.Select(doc => new SelectOption { Text = doc.Name, Id = doc.Id }));
                }
            }

            return results;
        }
    }
}