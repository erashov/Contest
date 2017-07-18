using System.Collections.Generic;

namespace TestStaff.Admin.Models
{
    public class PagingModel<T>
    {
        public IEnumerable<T> Records;

        public int Count;
    }
}