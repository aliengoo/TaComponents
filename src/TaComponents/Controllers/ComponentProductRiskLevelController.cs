using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using TaComponents.Models;

namespace TaComponents.Controllers
{
    [Route("api/risk-levels")]
    public class ComponentProductRiskLevelController : Controller
    {
        [HttpGet]
        public string[] Get()
        {
            return Enum.GetNames(typeof (ComponentProductRiskLevel));
        } 
    }
}