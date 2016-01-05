namespace TaComponents.Repositories
{
    using System.Threading.Tasks;

    using TaComponents.Models;

    public interface IRepository<T> where T : ModelBase
    {
        Task<T> FindById(string id);

        Task<T> Update(T t);

        Task<T> Insert(T t);

        Task Delete(string id);
    }
}