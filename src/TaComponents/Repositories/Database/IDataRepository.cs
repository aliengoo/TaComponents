namespace TaComponents.Repositories.Database
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using MongoDB.Bson;

    using Newtonsoft.Json.Linq;

    using TaComponents.Models;

    public interface IDataRepository<T> where T : ModelBase
    {
        Task<T> FindByIdAsync(string id);

        Task<T> UpdateAsync(T t);

        Task<T> InsertAsync(T t);

        Task InsertManyAsync(IEnumerable<T> t);

        Task DeleteAsync(string id);

        Task DeleteAllAsync();

        Task<List<T>> FindAsync(BsonDocument query);

        Task<List<T>> FindPageAsync(JObject query);
    }
}