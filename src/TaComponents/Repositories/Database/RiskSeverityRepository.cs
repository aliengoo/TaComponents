namespace TaComponents.Repositories.Database
{
    using System.Collections.Generic;
    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;

    using TaComponents.Helpers;
    using TaComponents.Models;

    /// <summary>
    /// https://en.wikipedia.org/wiki/Risk_Matrix
    /// </summary>
    public class RiskSeverityRepository : MongoRepository<RiskSeverity>
    {
        private bool _initialised = false;

        public RiskSeverityRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
            Init();
        }

        public RiskSeverityRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(collectionName, config, dateContext, userContext)
        {
            Init();
        }

        private void Init()
        {
            if (_initialised)
            {
                return;
            }

            var index = Builders<RiskSeverity>.IndexKeys.Ascending(rl => rl.Text);

            Collection.Indexes.CreateOne(index, new CreateIndexOptions
            {
                Unique = true
            });

            if (Collection.Count(FilterDefinition<RiskSeverity>.Empty) == 0)
            {
                var riskSeverities = new List<RiskSeverity>
                                     {
                                        new RiskSeverity
                                             {
                                                 Id = "0",
                                                 Text = "None"
                                             },
                                         new RiskSeverity
                                             {
                                                 Id = "1",
                                                 Text = "Negligible"
                                             },
                                         new RiskSeverity
                                             {
                                                Id = "2",
                                                Text = "Marginal"
                                             },
                                         new RiskSeverity
                                             {
                                                 Id = "3",
                                                 Text = "Critical"
                                             },
                                         new RiskSeverity
                                             {
                                                 Id = "4",
                                                 Text = "Catastrophic"
                                             }
                                     };

                Collection.InsertMany(riskSeverities);
            }

            _initialised = true;
        }
    }
}