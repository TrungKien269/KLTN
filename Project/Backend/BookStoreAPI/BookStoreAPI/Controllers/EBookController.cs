using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpPost("RentEBook")]
        public async Task<Response> RentEBook(string stripeEmail, string stripeToken, int policyID)
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
				int userID = Int32.Parse(checkToken);
                return await eBookBal.CreateTransactionRentEBook(stripeEmail, stripeToken, policyID, userID);
            }
        }

        [Authorize]
        [HttpGet("CheckUserEBook")]
        public async Task<Response> CheckUserEBook()
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetUserID(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                int userID = Int32.Parse(checkToken);
                return await eBookBal.CheckUserEBook(userID);
            }
        }
    }
}
