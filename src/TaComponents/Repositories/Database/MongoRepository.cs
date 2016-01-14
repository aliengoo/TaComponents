namespace TaComponents.Repositories.Database
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.IdGenerators;
    using MongoDB.Driver;

    using Newtonsoft.Json.Linq;

    using TaComponents.Exceptions;
    using TaComponents.Helpers;
    using TaComponents.Models;

    public class MongoRepository<T> : IDataRepository<T> where T : ModelBase
    {
        private readonly IDateContext _dateContext;
        private readonly IUserContext _userContext;
        private static volatile object _syncObject = new object();

        protected IMongoDatabase Database { get; }

        protected IMongoCollection<T> Collection { get; }

        public MongoRepository(
            IConfiguration config,
            IDateContext dateContext, 
            IUserContext userContext) : this(typeof(T).Name, config, dateContext, userContext)
        {
        }

        public MongoRepository(
            string collectionName,
            IConfiguration config,
            IDateContext dateContext,
            IUserContext userContext)
        {
            _dateContext = dateContext;
            _userContext = userContext;
            var url = MongoUrl.Create(config.Get<string>("Data:App:ConnectionString"));

            Database = new MongoClient(url).GetDatabase(url.DatabaseName);
            Collection = Database.GetCollection<T>(collectionName);

            // Version index for quickly determining the latest version
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Descending(t => t.Version));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Ascending(t => t.Created));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Ascending(t => t.CreatedBy));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Descending(t => t.CreatedBy));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Ascending(t => t.Updated));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Ascending(t => t.UpdatedBy));
            Collection.Indexes.CreateOne(Builders<T>.IndexKeys.Descending(t => t.UpdatedBy));
        }

        public Task<T> FindByIdAsync(string id)
        {
            return Collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        public Task<T> UpdateAsync(T doc)
        {

            lock (_syncObject)
            {
                // get the latest version of the document

                var latestVersion = Collection.Find(t => t.Id == doc.Id).SortByDescending(t => t.Version).FirstOrDefault();

                if (latestVersion.Version != doc.Version)
                {
                    throw new VersionConflictException($"The version of ${nameof(doc)}v${doc.Version} did not match the current version v${latestVersion.Version}");
                }

                // TODO: Mitigate transaction-less environment

                // take the latest version, copy it, strip the id, 
                var previousVersion = latestVersion;
                previousVersion.StaticId = latestVersion.Id;
                previousVersion.Id = null;
                
                Collection.InsertOne(previousVersion);

                doc.Version += 1;
                doc.Updated = _dateContext.Now;
                doc.UpdatedBy = _userContext.Name;
                doc.PreviousId = previousVersion.Id;

                Collection.FindOneAndReplace(d => d.Id == doc.Id, doc);

                // TODO: Notify change
            }

            return Task.FromResult(doc);
        }

        public async Task<T> InsertAsync(T doc)
        {
            doc.Version = 1;
            doc.Created = _dateContext.Now;
            doc.CreatedBy = _userContext.Name;
            doc.Updated = doc.Created;
            doc.UpdatedBy = doc.UpdatedBy;
            doc.Id = (string)StringObjectIdGenerator.Instance.GenerateId(Collection, doc);
            doc.StaticId = doc.Id;
            
            await Collection.InsertOneAsync(doc);

            return doc;
        }

        public Task InsertManyAsync(IEnumerable<T> t)
        {
            return Collection.InsertManyAsync(t);
        }

        public Task DeleteAsync(string id)
        {
            return Collection.DeleteOneAsync(t => t.Id == id);
        }

        public Task DeleteAllAsync()
        {
            // delete everything
            return Collection.DeleteManyAsync(t => t.Version >= 0);
        }

        public Task<List<T>> FindAsync(BsonDocument query)
        {
            return Collection.Find(new BsonDocumentFilterDefinition<T>(query)).ToListAsync();
        }

        public Task<List<T>> FindPageAsync(JObject query)
        {
            //// create the query
            //JToken queryPart;
            //BsonDocument queryDoc;

            //if (query.TryGetValue("query", out queryPart))
            //{
            //     queryDoc = BsonDocument.Parse(queryPart.ToString());
            //}
            //else
            //{
            //    throw new QueryException("Could not load query");
            //}



            //// count

            //// calculate the page
            /// 

            throw new NotImplementedException();
        }

        public Task<bool> IsEmptyAsync()
        {
            return Task.FromResult(Collection.Count(FilterDefinition<T>.Empty) == 0);
        }
    }
}