﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Control;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Promotion;
using BookStoreAPI.Models.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
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

        [HttpPost("Login")]
        public async Task<Response> Login(string username, string password)
        {
            if (username.Equals("admin") && password.Equals("bookstoreadmin"))
            {
                return await Task.FromResult<Response>(new Response("Success", true, 1, username, null,
                    JWTHelper.CreateAdminToken()));
            }
            return await Task.FromResult<Response>(Models.Response.CatchError("Login fail!"));
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
        [HttpGet("GetOrderDetails")]
        public async Task<Response> GetListOrderDetail(string orderID)
        {
            return await adminBal.GetOrder(orderID);
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
        public async Task<Response> InsertOrUpdate(BookRequest bookRequest, [FromBody] List<string> authors,
            List<string> images, int cateID, int formID, int supplierID, int publisherID)
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

            var listAuthor = new List<Author>();
            authors.ForEach(x =>
            {
                listAuthor.Add(new Author
                {
                    Id = 0,
                    Name = x
                });
            });

            return await adminBal.InsertBook(book, listAuthor, images, cateID, formID, supplierID, publisherID);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("DisableBook")]
        public async Task<Response> DisableBook(string id)
        {
            return await adminBal.DisableBook(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListPromotion")]
        public async Task<Response> GetListPromotion()
        {
            return await adminBal.GetListPromotion();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("GetPromotion")]
        public async Task<Response> GetPromotion(int id)
        {
            return await adminBal.GetPromotion(id);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("CreatePromotion")]
        public async Task<Response> CreatePromotion(PromotionRequest promotionRequest,
            [FromBody]List<PromotionDetailRequest> promotionDetailRequests)
        {
            return await adminBal.CreatePromotion(promotionRequest, promotionDetailRequests);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("UpdatePromotion")]
        public async Task<Response> UpdatePromotion(Promotion promotion)
        {
            return await adminBal.UpdatePromotion(promotion);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("CreatePromotionDetail")]
        public async Task<Response> CreatePromotionDetail(PromotionDetailRequest promotionDetailRequest)
        {
            var promotionDetail = new PromotionDetail
            {
                PromotionId = promotionDetailRequest.PromotionID,
                BookId = promotionDetailRequest.BookID,
                Discount = promotionDetailRequest.Discount
            };
            return await adminBal.CreatePromotionDetail(promotionDetail);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("UpdatePromotionDetail")]
        public async Task<Response> UpdatePromotionDetail(PromotionDetailRequest promotionDetailRequest)
        {
            var promotionDetail = new PromotionDetail
            {
                PromotionId = promotionDetailRequest.PromotionID,
                BookId = promotionDetailRequest.BookID,
                Discount = promotionDetailRequest.Discount
            };
            return await adminBal.UpdatePromotionDetail(promotionDetail);
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("DeletePromotionDetail")]
        public async Task<Response> DeletePromotionDetail(int promotionID, string bookID)
        {
            return await adminBal.DeletePromotionDetail(promotionID, bookID);
        }

        [HttpGet("ListSubCategory")]
        public async Task<Response> GetListSubCategory()
        {
            return await adminBal.GetListSubCategory();
        }

        [HttpGet("ListFormBook")]
        public async Task<Response> GetListFormBook()
        {
            return await adminBal.GetListFormBook();
        }

        [HttpGet("ListSupplier")]
        public async Task<Response> GetListSupplier()
        {
            return await adminBal.GetListSupplier();
        }

        [HttpGet("ListPublisher")]
        public async Task<Response> GetListPublisher()
        {
            return await adminBal.GetListPublisher();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("GetListUser")]
        public async Task<Response> GetListUser()
        {
            return await adminBal.GetListUser();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("UpdateUserState")]
        public async Task<Response> UpdateUserState(int userID, string state)
        {
            return await adminBal.UpdateAccountState(userID, state);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("StatisticUser")]
        public async Task<Response> StatisticUser(int userID)
        {
            return await adminBal.StatisticUser(userID);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("BookWithQuantityByMonth")]
        public async Task<Response> StatisticsBookWithQuantityByMonth()
        {
            return await adminBal.StatisticsBookWithQuantityByMonth();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("Top5Users")]
        public async Task<Response> StatisticsTop5Users()
        {
            return await adminBal.StatisticsTop5Users();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("NumberExportedOrderWithMonth")]
        public async Task<Response> StatisticsNumberExportedOrderWithMonth()
        {
            return await adminBal.StatisticsNumberExportedOrderWithMonth();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("NumberBookSoldWithMonth")]
        public async Task<Response> StatisticsNumberBookSoldWithMonth()
        {
            return await adminBal.StatisticsNumberBookSoldWithMonth();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("NumberAccountWithYear")]
        public async Task<Response> StatisticsNumberAccountWithYear()
        {
            return await adminBal.StatisticsNumberAccountWithYear();
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("RevenueWithMonth")]
        public async Task<Response> StatisticsRevenueWithMonth()
        {
            return await adminBal.StatisticsRevenueWithMonth();
        }

        [HttpPost("SendPromotionEmail")]
        public async Task<Response> SendPromotionEmail(int promotionID)
        {
            return await PromotionEmailHelper.SendEmail(promotionID);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("SendCouponEmail")]
        public async Task<Response> SendCouponEmail(float value, int userID)
        {
            return await adminBal.SendCoupon(value, userID);
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("ListReceipt")]
        public async Task<Response> GetListReceipt()
        {
            return await adminBal.GetListReceipt();
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("ImportReceipt")]
        public async Task<Response> ImportReceipt(ImportReceipt receipt, IFormFile file)
        {
            var filePath = await ImportReceiptHelper.UploadFile(receipt, file);
            return await ImportReceiptHelper.InsertBookNumber(filePath, receipt);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("UpdateReceipt")]
        public async Task<Response> UpdateImportReceipt(ImportReceipt receipt, IFormFile file)
        {
            if (file is null)
            {
                await ImportReceiptHelper.UpdateFile(receipt);
                return await adminBal.UpdateReceipt(receipt);
            }
            else
            {
                await ImportReceiptHelper.UploadFile(receipt, file);
                return await adminBal.UpdateReceipt(receipt);
            }
        }
    }
}
