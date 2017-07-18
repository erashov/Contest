using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContestsClients.Admin.Models
{
    public class PagingModel<T>
    {
        public IEnumerable<T> Records;

        public int Count;
    }
}