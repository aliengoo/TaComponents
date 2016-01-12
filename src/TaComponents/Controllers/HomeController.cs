namespace TaComponents.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNet.Mvc;

    using TaComponents.Helpers;
    using TaComponents.Models;
    using TaComponents.Repositories.ActiveDirectory;

    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IUserCacheRepository _userCacheRepository;

        private readonly IUserContext _userContext;

        public HomeController(IUserCacheRepository userCacheRepository, IUserContext userContext)
        {
            _userCacheRepository = userCacheRepository;
            _userContext = userContext;
        }

        [HttpGet("me")]
        public Task<User> GetMe()
        {
            var name = _userContext.Name;
            return _userCacheRepository.GetUser(name);
        }
    }
}