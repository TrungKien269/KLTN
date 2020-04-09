using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("BookStoreAPIPolicy")]
    public class ListBookController : Controller
    {
        private ListBookBAL listBookBal;

        public ListBookController()
        {
            this.listBookBal = new ListBookBAL();
        }

        [HttpGet("GetAll")]
        public async Task<Response> Index()
        {
            return await listBookBal.GetListBookByCategory("Fiction");
        }

        [HttpGet("Category/{category}")]
        public async Task<Response> GetBooksByCategory(string category)
        {
            return await listBookBal.GetListBookByCategory(category);
        }

        [HttpGet("SubCategory/{subcategory}")]
        public async Task<Response> GetBooksBySubcategory(string subcategory)
        {
            return await listBookBal.GetListBookBySubCategory(subcategory);
        }

        [HttpGet("Search/value={value}")]
        public async Task<Response> SearchBook(string value)
        {
            return await listBookBal.SearchBook(value);
        }
    }
}
