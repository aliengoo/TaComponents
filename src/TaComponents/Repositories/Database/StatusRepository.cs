namespace TaComponents.Repositories.Database
{
    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;
    using System.Collections.Generic;
    using TaComponents.Helpers;
    using TaComponents.Models;

    public class StatusRepository : MongoRepository<Status>
    {
        private bool _initialised = false;

        public StatusRepository(IConfiguration config, IDateContext dateContext, IUserContext userContext)
            : base(config, dateContext, userContext)
        {
            Init();
        }

        public StatusRepository(string collectionName, IConfiguration config, IDateContext dateContext, IUserContext userContext)
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

            var index = Builders<Status>.IndexKeys.Ascending(cps => cps.Text);

            Collection.Indexes.CreateOne(index, new CreateIndexOptions
            {
                Unique = true
            });

            if (Collection.Count(FilterDefinition<Status>.Empty) == 0)
            {
                var statuses = new List<Status>
                                                   {
                                                     new Status
                                                         {
                                                            Id = "1",
                                                            Text = "Live",
                                                            Description = "The product is currently in use by TA"
                                                         },
                                                     new Status
                                                         {
                                                             Id = "2",
                                                             Text = "Migrated",
                                                             Description = "The product and or data have been migrated"
                                                         },
                                                     new Status
                                                         {
                                                             Id = "3",
                                                             Text = "Retired",
                                                             Description = "The product is no longer required and has been retired from use"
                                                         },
                                                     new Status
                                                         {
                                                             Id = "4",
                                                             Text = "Archived",
                                                             Description = "The product and or data have been archived"
                                                         }
                                                   };

                Collection.InsertMany(statuses);
            }

            _initialised = true;
        }
    }
}