namespace TaComponents.Models
{
    using System;
    using System.Collections.Generic;

    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson.Serialization.Serializers;

    public class Thing : ModelBase
    {
        [BsonRequired]
        public string Name { get; set; }
        
        public string Description { get; set; }

        /// <summary>
        /// <see cref="Thing"/> that this product relies upon
        /// </summary>
        public List<string> BuiltWithTheseThings { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public Risk Risk { get; set; }

        /// <summary>
        /// <see cref="Status"/>
        /// </summary>
        public string CurrentStatusId { get; set; }

        /// <summary>
        /// Post TA, in what state does this thing need to be in?
        /// <see cref="Status"/>
        /// </summary>
        public string IntendedStatusId { get; set; }

        public string VendorId { get; set; }

        public List<Team> Teams { get; set; }

        public List<Comment> Comments { get; set; }
    }
}