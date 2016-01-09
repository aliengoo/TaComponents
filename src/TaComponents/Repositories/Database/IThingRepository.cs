namespace TaComponents.Repositories.Database
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using TaComponents.Models;
    using TaComponents.Models.View;

    public interface IThingRepository : IDataRepository<Thing>
    {
        Task<bool> IsNameUnique(string name, string id = null);

        Task<List<SelectOption>> NameSearch(string search);
    }
}