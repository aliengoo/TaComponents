using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace TaComponents.Controllers
{
    using TaComponents.Repositories;

    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IRepository<Product> _productRepository;

        public ProductController(IRepository<Product> productRepository)
        {
            _productRepository = productRepository;
        }
    }
}
