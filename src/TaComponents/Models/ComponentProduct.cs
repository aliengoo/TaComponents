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

        public string ParentComponentProduct { get; set; }

        [BsonSerializer(typeof(EnumSerializer<ComponentProductRiskLevel>), SerializerType = typeof(string))]
        public ComponentProductRiskLevel StaffRisk { get; set; }

        [BsonRequired]
        [BsonSerializer(typeof(EnumSerializer<ComponentProductStatus>), SerializerType = typeof(string))]
        public ComponentProductStatus CurrentStatus { get; set; }

        [BsonSerializer(typeof(EnumSerializer<ComponentProductStatus>), SerializerType = typeof(string))]
        public ComponentProductStatus IntendedStatus { get; set; }

        public DateTime? IntendedStatusDueDate { get; set; }

        public string IntendedStatusNotes { get; set; }

        public List<string> TeamMembers { get; set; }

        public List<string> BusinessOwners { get; set; }
        
        public List<Comment> Comments { get; set; }
    }
}