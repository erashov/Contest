using System.Linq;

namespace TestStaff.Dal.Abstract
{
    public interface IBaseRepository<T>
    {
        IQueryable<T> Find();

        IQueryable<T> FindPage(int page, int count);

        T FindById(int id);

        T Add(T entity);

        T Update(T entity);

        T Remove(T entity);
    }
}
