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
    public class RiskProbabilityRepository : MongoRepository<RiskProbability>
    {
        private bool _initialised = false;

        public RiskProbabilityRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
            Init();
        }

        public RiskProbabilityRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
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

            var index = Builders<RiskProbability>.IndexKeys.Ascending(rl => rl.Text);

            Collection.Indexes.CreateOne(index, new CreateIndexOptions
            {
                Unique = true
            });

            if (Collection.Count(FilterDefinition<RiskProbability>.Empty) == 0)
            {
                var riskProbabilities = new List<RiskProbability>
                                     {
                                        new RiskProbability
                                             {
                                                 Id = "0",
                                                 Text = "None"
                                             },
                                         new RiskProbability
                                             {
                                                 Id = "1",
                                                 Text = "Rare"
                                             },
                                         new RiskProbability
                                             {
                                                Id = "2",
                                                Text = "Unlikely"
                                             },
                                         new RiskProbability
                                             {
                                                 Id = "3",
                                                 Text = "Possible"
                                             },
                                         new RiskProbability
                                             {
                                                 Id = "4",
                                                 Text = "Likely"
                                             },
                                         new RiskProbability
                                             {
                                                 Id = "5",
                                                 Text = "Certain"
                                             }
                                     };

                Collection.InsertMany(riskProbabilities);
            }

            _initialised = true;
        }
    }
}