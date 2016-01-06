using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaComponents.Models;

namespace TaComponents.Repositories.ActiveDirectory
{
    public class FakeUserRepository : IUserRepository
    {
        public Task<IEnumerable<User>> GetAppMembers()
        {

            var dic = new Dictionary<string, string>
            {
                { "Homer", "Simpson"},
                { "Richard", "Harris"},
                { "Gordon", "Smith"},
                { "Fox", "Mulder"},
                { "Dana", "Scully"},
                { "Leo", "McGarry"},
                { "Jeb", "Bartlett"},
                { "Pepper", "Potts"},
                { "Tony", "Stark"},
                { "Jimmy", "Fallon"},
                { "Gillian", "Anderson"},
                { "David", "Duchovony"},
                { "Slim", "Pickens"},
                { "Robert", "De Niro"},
                { "Al", "Pacino"},
                { "Josh", "Liman"},
                { "Debbie", "Dingle"},
            };

            var fakeUsers = dic.Select((kvp) =>
            {
                var samAccountName = $"{kvp.Key[0]}{kvp.Value}".ToLower().Replace(" ", "");
                return new User
                {
                    FirstName = kvp.Key,
                    LastName = kvp.Value,
                    SamAccountName = samAccountName,
                    Email = $"{samAccountName}@test.com"

                };
            });
            
            return Task.FromResult(fakeUsers);
        }
    }
}