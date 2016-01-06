namespace TaComponents.Repositories.ActiveDirectory
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TaComponents.Models;
    using TaComponents.Repositories.Database;

    public interface IUserCacheRepository : IUserRepository
    {
        Task ClearCache();

        Task<User> GetUser(string username);

        Task<List<User>> FilterUsers(string partialUserName);
    }
}