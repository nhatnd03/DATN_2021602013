using API.Config;
using CafeShop.Config;
using ManagementCourse.IReposiory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CafeShop.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class, new()
    {
        public int Confirm(T[] item)
        {
            throw new NotImplementedException();
        }

        public int Create(T item)
        {
            throw new NotImplementedException();
        }

        public Task<int> CreateAsync(T item)
        {
            throw new NotImplementedException();
        }

        public int CreateRange(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            return SQLHelper<T>.DeleteModelByID(id);
        }

        public IEnumerable<T> Find(Func<T, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> GetAll()
        {
            throw new NotImplementedException();
        }

        public T GetByID(int id)
        {
            return SQLHelper<T>.FindByID(id);
        }

        public int Remove(T item)
        {
            throw new NotImplementedException();
        }

        public int RemoveRange(IEnumerable<T> items)
        {
            throw new NotImplementedException();
        }

        public int Update(T item)
        {
            return SQLHelper<T>.Update(item).ID;
        }
    }
}