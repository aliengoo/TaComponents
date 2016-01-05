namespace TaComponents.Repositories.Mongo
{
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;

    using Models;

    public abstract class MongoRepository<T> : IRepository<T> where T : ModelBase
    {
        protected IMongoDatabase Database { get; }

        protected IMongoCollection<T> Collection { get; }

        protected MongoRepository(IConfiguration config, string collectionName, string connectionStringName = "Data:Mongo:App:ConnectionString")
        {
            var url = MongoUrl.Create(config.Get<string>(connectionStringName));

            Database = new MongoClient(url).GetDatabase(url.DatabaseName);
            Collection = Database.GetCollection<T>(collectionName);
        }

        public Task<T> FindById(string id)
        {
            return Collection.Find(t => t.Id == id).FirstOrDefaultAsync();
        }

        public async Task<T> Update(T doc)
        {
            await Collection.UpdateOneAsync(t => t.Id == doc.Id, new ObjectUpdateDefinition<T>(doc));

            return doc;
        }

        public async Task<T> Insert(T doc)
        {
            doc.Version = 1;
            await Collection.InsertOneAsync(doc);

            return doc;
        }

        public Task Delete(string id)
        {
            return Collection.DeleteOneAsync(t => t.Id == id);
        }

        private async bool Task<bool> IsCurrentVersion(int version, string id)
        {
            var sortByVersion = new SortDefinitionBuilder<T>().Descending(t => t.Version);

            var doc = await Collection.Find(t => t.Id == id).Sort(sortByVersion).FirstOrDefaultAsync();

            return doc.Version == version;
        }
    }
}