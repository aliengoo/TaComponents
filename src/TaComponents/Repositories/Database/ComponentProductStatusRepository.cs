namespace TaComponents.Repositories.Database
{
    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;
    using System.Collections.Generic;
    using TaComponents.Helpers;
    using TaComponents.Models;

    public class ComponentProductStatusRepository : MongoRepository<ComponentProductStatus>
    {
        private bool _initialised = false;

        public ComponentProductStatusRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
            Init();
        }

        public ComponentProductStatusRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(collectionName, config, dateContext, userContext)
        {
            Init();
        }

        public void Init()
        {
            if (_initialised)
            {
                return;
            }

            var index = Builders<ComponentProductStatus>.IndexKeys.Ascending(cps => cps.Text);

            Collection.Indexes.CreateOne(index, new CreateIndexOptions
            {
                Unique = true
            });

            if (Collection.Count(FilterDefinition<ComponentProductStatus>.Empty) == 0)
            {
                var componentProductStatuses = new List<ComponentProductStatus>
                                                   {
                                                     new ComponentProductStatus
                                                         {
                                                            Id = "1",
                                                            Text = "Live",
                                                            Description = "The product is currently in use by TA"
                                                         },
                                                     new ComponentProductStatus
                                                         {
                                                             Id = "2",
                                                             Text = "Migrated",
                                                             Description = "The product and or data have been migrated"
                                                         },
                                                     new ComponentProductStatus
                                                         {
                                                             Id = "3",
                                                             Text = "Retired",
                                                             Description = "The product is no longer required and has been retired from use"
                                                         },
                                                     new ComponentProductStatus
                                                         {
                                                             Id = "4",
                                                             Text = "Archived",
                                                             Description = "The product and or data have been archived"
                                                         }
                                                   };

                Collection.InsertMany(componentProductStatuses);
            }

            _initialised = true;
        }
    }
}