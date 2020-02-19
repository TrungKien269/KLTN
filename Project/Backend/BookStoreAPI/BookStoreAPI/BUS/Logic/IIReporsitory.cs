using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.BUS.Logic
{
    public interface IReporsitory<Obj, Key, Response>
    {
        Task<Response> GetList();
        Task<Response> Insert(Obj obj);
        Task<Response> Delete(Key id);
        Task<Response> Update(Obj obj);
        Task<Response> GetObject(Key id);
    }
}
