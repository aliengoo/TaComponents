namespace TaComponents.Models
{
    using System;
    using System.Collections.Generic;

    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson.Serialization.IdGenerators;

    public class ModelBase
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string Id { get; set; }

        [BsonRequired]
        public DateTime Created { get; set; }

        public string CreatedBy { get; set; }

        [BsonRequired]
        public DateTime Updated { get; set; }

        public string UpdatedBy { get; set; }

        [BsonExtraElements]
        public Dictionary<string, object> Meta { get; set; }

        [BsonRequired]
        public int Version { get; set; }
    }
}