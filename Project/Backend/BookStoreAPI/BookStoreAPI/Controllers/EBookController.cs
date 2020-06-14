using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class EBookController : Controller
    {
        private EBookBAL eBookBal;

        public EBookController()
        {
            eBookBal = new EBookBAL();
        }

        [HttpGet("ListEBook")]
        public async Task<Response> GetListEBook()
        {
            return await eBookBal.GetListEBook();
        }

        [HttpGet("ListEBookCategory")]
        public async Task<Response> GetListEBookCategory()
        {
            return await eBookBal.GetListCategory();
        }

        [HttpGet("GetEBook")]
        public async Task<Response> GetEBook(string id)
        {
            return await eBookBal.GetEBook(id);
        }
    }
}
