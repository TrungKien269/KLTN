using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    [EnableCors("BookStoreAPIPolicy")]
    public class AdminController : Controller
    {
        private AdminBAL adminBal;

        public AdminController()
        {
            adminBal = new AdminBAL();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListProcessingAdmin")]
        public async Task<Response> GetListProcessingOrder()
        {
            return await adminBal.GetListProcessing();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListDeliveringAdmin")]
        public async Task<Response> GetListDeliveryOrder()
        {
            return await adminBal.GetListDelivery();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListDeliveredAdmin")]
        public async Task<Response> GetListDeliveredOrder()
        {
            return await adminBal.GetListDelivered();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListCanceledAdmin")]
        public async Task<Response> GetListCanceledOrder()
        {
            return await adminBal.GetListCanceled();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("ConfirmOrder")]
        public async Task<Response> ConfirmOrder(string id, string status)
        {
            var order = (await adminBal.GetOrder(id)).Obj as Order;
            var newOrder = await adminBal.UpdateStatus(order, status);
            return new Response("Sucess", true, 1, newOrder.Obj as Order);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("SearchBookAdmin")]
        public async Task<Response> SearchBook(string value)
        {
            return await adminBal.SearchBook(value);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("InsertUpdateBook")]
        public async Task<Response> InsertOrUpdate(BookRequest bookRequest, List<Author> authors, List<string> images, int cateID,
            int formID, int supplierID, int publisherID)
        {
            var book = new Book
            {
                Id = bookRequest.Id,
                Name = bookRequest.Name,
                OriginalPrice = bookRequest.OriginalPrice,
                CurrentPrice = bookRequest.CurrentPrice,
                ReleaseYear = bookRequest.ReleaseYear,
                Weight = bookRequest.Weight,
                NumOfPage = bookRequest.NumOfPage,
                Image = bookRequest.Image,
                Summary = bookRequest.Summary,
                Status = bookRequest.Status
            };

            return await adminBal.InsertBook(book, authors, images, cateID, formID, supplierID, publisherID);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("Remove")]
        public async Task<Response> RemoveBook(string id)
        {
            return await adminBal.RemoveBook(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("BookWithQuantityByMonth")]
        public async Task<Response> StatisticsBookWithQuantityByMonth()
        {
            return await adminBal.StatisticsBookWithQuantityByMonth();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("Top3Users")]
        public async Task<Response> StatisticsTop3Users()
        {
            return await adminBal.StatisticsTop3Users();
        }
    }
}
