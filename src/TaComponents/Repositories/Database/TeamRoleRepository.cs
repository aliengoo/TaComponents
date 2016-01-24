namespace TaComponents.Repositories.Database
{
    using Microsoft.Extensions.Configuration;

    using MongoDB.Driver;
    using System.Collections.Generic;
    using TaComponents.Helpers;
    using TaComponents.Models;

    public class TeamRoleRepository : MongoRepository<Status>
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
                                                            Id = "0",
                                                            Text = "",
                                                            Description = "There is no role"
                                                         },
                                                     new Status
                                                         {
                                                            Id = "1",
                                                            Text = "Technical Support",
                                                            Description = "This team can offer technical support"
                                                         },
                                                     new Status
                                                         {
                                                            Id = "2",
                                                            Text = "Development",
                                                            Description = "This team were responsible for developing this thing"
                                                         },
                                                     new Status
                                                         {
                                                             Id = "3",
                                                             Text = "Business Specialist",
                                                             Description = "This team has specialised knowledge of this thing"
                                                         },
                                                     new Status
                                                         {
                                                             Id = "4",
                                                             Text = "User",
                                                             Description = "This team uses this thing"
                                                         }
                                                   };

                Collection.InsertMany(statuses);
            }

            _initialised = true;
        }
    }
}