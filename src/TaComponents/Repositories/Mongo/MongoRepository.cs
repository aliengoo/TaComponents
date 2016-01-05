using System.Collections.Generic;
using Microsoft.AspNet.Http;
using MongoDB.Bson;
using TaComponents.Exceptions;
using TaComponents.Helpers;

namespace TaComponents.Repositories.Mongo
{
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;

    using Models;

    public class MongoRepository<T> : IRepository<T> where T : ModelBase
    {
        private readonly IDateContext _dateContext;
        private readonly IUserContext _userContext;
        private static volatile object _syncObject = new object();

        protected IMongoDatabase Database { get; }

        protected IMongoCollection<T> Collection { get; }

        public MongoRepository(
            IConfiguration config,
            IDateContext dateContext, 
            IUserContext userContext)
        {
            _dateContext = dateContext;
            _userContext = userContext;
            var url = MongoUrl.Create(config.Get<string>("Data:App:ConnectionString"));

            Database = new MongoClient(url).GetDatabase(url.DatabaseName);
            Collection = Database.GetCollection<T>(nameof(T));
        }

        public Task<T> FindById(string id)
        {
            return Collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        public Task<T> Update(T doc)
        {

            lock (_syncObject)
            {
                // get the latest version of the document

                var latestVersion = Collection.Find(t => t.Id == doc.Id).SortByDescending(t => t.Version).FirstOrDefault();

                if (latestVersion.Version != doc.Version)
                {
                    throw new VersionConflictException($"The version of ${nameof(doc)}v${doc.Version} did not match the current version v${latestVersion.Version}");
                }

                doc.Version += 1;
                doc.Updated = _dateContext.Now;
                doc.UpdatedBy = _userContext.Name; 

                Collection.InsertOne(doc);

                // TODO: Notify change
            }

            return Task.FromResult(doc);
        }

        public async Task<T> Insert(T doc)
        {
            doc.Version = 1;
            doc.Created = _dateContext.Now;
            doc.CreatedBy = _userContext.Name;
            doc.Updated = doc.Created;
            doc.UpdatedBy = doc.UpdatedBy;

            await Collection.InsertOneAsync(doc);

            return doc;
        }

        public Task Delete(string id)
        {
            return Collection.DeleteOneAsync(t => t.Id == id);
        }

        public Task<List<T>> Find(BsonDocument query)
        {
            // TODO: Enhance MongoRepository.Find
            return Collection.Find(new BsonDocumentFilterDefinition<T>(query)).ToListAsync();
        }
    }
}