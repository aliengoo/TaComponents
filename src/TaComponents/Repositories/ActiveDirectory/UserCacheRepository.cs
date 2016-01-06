namespace TaComponents.Repositories.ActiveDirectory
{
    using System.Collections.Generic;
    using System.Linq;

    using MongoDB.Bson;

    using TaComponents.Models;
    using TaComponents.Repositories.Database;
    using System.Threading.Tasks;

    using MongoDB.Driver;

    using Newtonsoft.Json.Linq;

    public class UserCacheRepository : IUserCacheRepository
    {
        private readonly IUserRepository _userRepository;

        private readonly IDataRepository<User> _userCacheDataRepository;

        public UserCacheRepository(IUserRepository userRepository, IDataRepository<User> userCacheDataRepository)
        {
            _userRepository = userRepository;
            _userCacheDataRepository = userCacheDataRepository;
        }

        public async Task<IEnumerable<User>> GetAppMembers()
        {
            // find in cache
            var results = await _userCacheDataRepository.FindAsync(new BsonDocument());

            // if there are results, return them
            if (results.Any())
            {
                return results;
            }

            // otherwise, seek in AD, write to cache, and re-search the cache.
            var users = await _userRepository.GetAppMembers();

            await _userCacheDataRepository.InsertManyAsync(users);

            return await _userCacheDataRepository.FindAsync(new BsonDocument());
        }

        public Task ClearCache()
        {
            return _userCacheDataRepository.DeleteAllAsync();
        }

        public async Task<User> GetUser(string username)
        {
            var query = new BsonDocument { { "SamAccountName", username } };

            var users = await _userCacheDataRepository.FindAsync(query);

            return users.FirstOrDefault();
        }

        public async Task<List<User>> FilterUsers(string partialUserName)
        {
            var regex = new BsonRegularExpression($"{partialUserName}", "i");
            var orOptions = new List<BsonDocument>
                                {
                                    new BsonDocument
                                        {
                                            {
                                                "SamAccountName",
                                                regex
                                            }
                                        },
                                    new BsonDocument { { "FirstName", regex } },
                                    new BsonDocument { { "LastName", regex } }
                                };



            var query = new BsonDocument
                            {
                                { "$or", new BsonArray(orOptions) },
                                
                            };

            var results = await _userCacheDataRepository.FindAsync(query);

            // TODO: Need to add sort option, instead of this hack
            return results.OrderBy(x => x.SamAccountName).ToList();
        }
    }
}