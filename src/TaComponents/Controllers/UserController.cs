namespace TaComponents.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.AspNet.Mvc;

    using TaComponents.Models;
    using TaComponents.Repositories.ActiveDirectory;

    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserCacheRepository _userCacheRepository;

        public UserController(IUserCacheRepository userCacheRepository)
        {
            _userCacheRepository = userCacheRepository;
        }

        [HttpGet("all")]
        public Task<IEnumerable<User>> Get()
        {
            return _userCacheRepository.GetAppMembers();
        }

        [HttpGet]
        public Task<User> Get([FromQuery]string username)
        {
            return _userCacheRepository.GetUser(username);
        }

        [HttpGet("filter")]
        public Task<List<User>> Filter([FromQuery]string q)
        {
            return _userCacheRepository.FilterUsers(q);
        }

        [HttpDelete]
        public Task Delete()
        {
            return _userCacheRepository.ClearCache();
        }
    }
}