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

        public string Vendor { get; set; }

        /// <summary>
        /// <see cref="Thing"/> that this product relies upon
        /// </summary>
        public List<string> BuiltWithTheseThings { get; set; }

        /// <summary>
        /// <see cref="RiskLevel"/>
        /// </summary>
        public string StaffRiskLevelId { get; set; }

        /// <summary>
        /// <see cref="Status"/>
        /// </summary>
        public string CurrentStatusId { get; set; }

        /// <summary>
        /// Post TA, in what state does this thing need to be in?
        /// <see cref="Status"/>
        /// </summary>
        public string IntendedStatusId { get; set; }

        /// <summary>
        /// Key individual or individuals who are regarded as experts on thing thing
        /// </summary>
        public List<string> PrimaryTechnicalTeam { get; set; }

        /// <summary>
        /// Team members who could offer some support, but should not be considered the first choice.
        /// </summary>
        public List<string> SecondaryTechnicalTeam { get; set; }
        
        /// <summary>
        /// Considered the owner of the system
        /// </summary>
        public List<string> BusinessOwners { get; set; }
       
        public List<Comment> Comments { get; set; }
    }
}