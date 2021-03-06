﻿using System;
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
            //return await listBookBal.GetListBookByCategory("Fiction");
            return await listBookBal.GetListBook();
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

        [HttpGet("Filter/{abovePrice}/{belowPrice}/{category}")]
        public async Task<Response> GetBookByCategoryAndPrice(string abovePrice, string belowPrice, string category)
        {
            return await listBookBal.GetListBookGetBookByCategoryAndPrice(int.Parse(abovePrice), int.Parse(belowPrice),
                category);
        }

        [HttpGet("Search/value={value}")]
        public async Task<Response> SearchBook(string value)
        {
            return await listBookBal.SearchBook(value);
        }
    }
}
