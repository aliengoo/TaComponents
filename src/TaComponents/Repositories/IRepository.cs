using System.Collections.Generic;
using MongoDB.Bson;

namespace TaComponents.Repositories
{
    using System.Threading.Tasks;

    using Models;

    public interface IRepository<T> where T : ModelBase
    {
        Task<T> FindById(string id);

        Task<T> Update(T t);

        Task<T> Insert(T t);

        Task Delete(string id);

        Task<List<T>> Find(BsonDocument query);
    }
}