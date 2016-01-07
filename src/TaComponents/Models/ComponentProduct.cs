namespace TaComponents.Models
{
    using System;
    using System.Collections.Generic;

    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson.Serialization.Serializers;

    public class ComponentProduct : ModelBase
    {
        [BsonRequired]
        public string Name { get; set; }

        public string Information { get; set; }

        public string Company { get; set; }

        /// <summary>
        /// <see cref="ComponentProduct"/> that this product relies upon
        /// </summary>
        public List<string> Stack { get; set; }

        /// <summary>
        /// <see cref="RiskLevel"/>
        /// </summary>
        [BsonRequired]
        public string StaffRisk { get; set; }

        /// <summary>
        /// <see cref="ComponentProductStatus"/>
        /// </summary>
        [BsonRequired]
        public string CurrentStatusId { get; set; }

        /// <summary>
        /// <see cref="ComponentProductStatus"/>
        /// </summary>
        public ComponentProductStatus IntendedStatus { get; set; }

        public DateTime? IntendedStatusDueDate { get; set; }

        public string IntendedStatusNotes { get; set; }

        public List<string> TeamMembers { get; set; }

        public List<string> BusinessOwners { get; set; }
        
        public List<Comment> Comments { get; set; }
    }
}