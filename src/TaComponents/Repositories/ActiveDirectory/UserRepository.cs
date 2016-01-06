namespace TaComponents.Repositories.ActiveDirectory
{
    using System;
    using System.Collections.Generic;
    using System.DirectoryServices.AccountManagement;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.Extensions.Configuration;

    using TaComponents.Models;

    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;

        private const bool SearchRecursively = false;

        public UserRepository(IConfiguration config)
        {
            _config = config;
        }

        public Task<IEnumerable<User>> GetAppMembers()
        {
            var users = new List<User>();

            using (
                var context = new PrincipalContext(ContextType.Domain, DomainName))
            {
                using (var group = GroupPrincipal.FindByIdentity(context, UserGroup))
                {
                    if (group != null)
                    {
                        var userPrincipals = group.GetMembers(SearchRecursively);

                        Func<UserPrincipal, bool> realUserFilter = up => up.GivenName != null && up.Surname != null;

                        Func<UserPrincipal, User> adapter = up => new User
                        {
                            SamAccountName = up.SamAccountName,
                            Email = up.EmailAddress,
                            Extension = up.VoiceTelephoneNumber,
                            FirstName = up.GivenName,
                            MiddleNames = up.MiddleName,
                            LastName = up.Surname
                        };

                        var tempDic = new Dictionary<string, User>();

                        foreach (var up in userPrincipals
                            .Cast<UserPrincipal>()
                            .Where(realUserFilter)
                            .Where(up => !tempDic.ContainsKey(up.SamAccountName)))
                        {
                            tempDic.Add(up.SamAccountName, adapter(up));
                        }

                        users.AddRange(tempDic.Values);
                    }
                }
            }

            return Task.FromResult((IEnumerable<User>)users);
        }

        private string DomainName => _config.Get<string>("ActiveDirectory:DomainName");

        private string UserGroup => _config.Get<string>("ActiveDirectory:UserGroup");

    }
}