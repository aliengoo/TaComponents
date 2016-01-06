using System;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    [Route("api/product-statuses")]
    public class ComponentProductStatusController : Controller
    {
        [HttpGet]
        public string[] Get()
        {
            return Enum.GetNames(typeof(ComponentProductStatus));
        }
    }
}