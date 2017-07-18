using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContestsClients.Dal.Entities
{
    public class Contest
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateDate { get; set; }

        public string Result { get; set; }

        public virtual ICollection<Question> Questions { get; set; }
 
    }
}
