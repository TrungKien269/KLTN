﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
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
    public class ForgotPasswordController : Controller
    {
        private ForgotPasswordBAL forgotPasswordBal;

        public ForgotPasswordController()
        {
            forgotPasswordBal = new ForgotPasswordBAL();
        }

        [HttpGet("ConfirmEmail")]
        public async Task<Response> ConfirmEmail(string email)
        {
            var response = await forgotPasswordBal.ValidateEmail(email);
            if (response.Status)
            {
                return await forgotPasswordBal.ConfirmEmail(email);
            }
            else
            {
                return response;
            }
        }

        [HttpPost("ResetPassword")]
        [Authorize(Roles = "Temporary")]
        public async Task<Response> ResetPassword(string newPassword)
        {
            string accessToken = HttpContext.Request.Headers["Authorization"];
            var checkToken = JWTHelper.GetEmail(accessToken);
            if (checkToken is "Error")
            {
                return await Task.FromResult<Response>(new Response("Error", false, 0, null));
            }
            else
            {
                return await forgotPasswordBal.ResetPassword(checkToken, newPassword);
            }
        }
    }
}
