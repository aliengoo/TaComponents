namespace TaComponents.Repositories.ActiveDirectory
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TaComponents.Models;

    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAppMembers();
    }
}