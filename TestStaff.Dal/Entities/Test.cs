using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace TestStaff.Dal.Entities
{
    [Serializable]
    [DataContract(IsReference = true)]
    public class Test
    {
        [DataMember]
        public int? Id { get; set; }

        [DataMember]
        [ForeignKey("ParentTest")]
        public int? ParentId { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public DateTime CreateDate { get; set; }
        [DataMember]
        public string Result { get; set; }
        [DataMember]
        public virtual List<Question> Questions { get; set; }
        [DataMember]
        public virtual Test ParentTest { get; set; }
        [DataMember]
        public virtual List<Test> ChildTests { get; set; }
        [NotMapped]
        public bool HasChilds { get; set; }
        public Test()
        {
            Questions = new List<Question>();
            ChildTests = new List<Test>();
        }

    }
}
