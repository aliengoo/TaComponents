namespace TaComponents.Repositories.Database
{
    using System.Collections.Generic;
    using System.Reflection.Metadata;

    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;

    using TaComponents.Helpers;
    using TaComponents.Models;

    public class RiskLevelRepository : MongoRepository<RiskLevel>
    {
        private bool _initialised = false;

        public RiskLevelRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
            Init();
        }

        public RiskLevelRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
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

            var index = Builders<RiskLevel>.IndexKeys.Ascending(rl => rl.Text);

            Collection.Indexes.CreateOne(index, new CreateIndexOptions
            {
                Unique = true
            });

            if (Collection.Count(FilterDefinition<RiskLevel>.Empty) == 0)
            {
                var riskLevels = new List<RiskLevel>
                                     {
                                         new RiskLevel
                                             {
                                                 Id = "1",
                                                 Text = "Low"
                                             },
                                         new RiskLevel
                                             {
                                                Id = "2",
                                                Text = "Medium"
                                             },
                                         new RiskLevel
                                             {
                                                 Id = "3",
                                                 Text = "High"
                                             }
                                     };

                Collection.InsertMany(riskLevels);
            }

            _initialised = true;
        }
    }
}