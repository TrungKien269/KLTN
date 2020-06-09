using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Promotion;

namespace BookStoreAPI.BUS.Control
{
    public class AdminBAL
    {
        private AccountBAL accountBal;
        private UserBAL userBal;
        private OrderBAL orderBal;
        private BookBAL bookBal;
        private AuthorBAL authorBal;
        private CRUDBookBAL crudBookBal;
        private CategoryBAL categoryBal;
        private FormBookBAL formBookBal;
        private SupplierBAL supplierBal;
        private PublisherBAL publisherBal;
        private PromotionBAL promotionBal;
        private CRUDPromotionBAL crudPromotionBal;

        public AdminBAL()
        {
            accountBal = new AccountBAL();
            userBal = new UserBAL();
            orderBal = new OrderBAL();
            bookBal = new BookBAL();
            authorBal = new AuthorBAL();
            crudBookBal = new CRUDBookBAL();
            categoryBal = new CategoryBAL();
            formBookBal = new FormBookBAL();
            supplierBal = new SupplierBAL();
            publisherBal = new PublisherBAL();
            promotionBal = new PromotionBAL();
            crudPromotionBal = new CRUDPromotionBAL();
        }

        public async Task<Response> GetListProcessing()
        {
            return await orderBal.GetListProcessingOrders();
        }

        public async Task<Response> GetListDelivery()
        {
            return await orderBal.GetListDeliveryOrders();
        }

        public async Task<Response> GetListDelivered()
        {
            return await orderBal.GetListDeliveredOrders();
        }

        public async Task<Response> GetListCanceled()
        {
            return await orderBal.GetListCanceledOrders();
        }

        public async Task<Response> GetListSubCategory()
        {
            return await categoryBal.GetListSubCategory();
        }

        public async Task<Response> GetListFormBook()
        {
            return await formBookBal.GetListFormBook();
        }

        public async Task<Response> GetListSupplier()
        {
            return await supplierBal.GetListSupplier();
        }

        public async Task<Response> GetListPublisher()
        {
            return await publisherBal.GetListPublishers();
        }

        public async Task<Response> GetOrder(string orderID)
        {
            return await orderBal.GetOrder(orderID);
        }

        public async Task<Response> UpdateStatus(Order order, string status)
        {
            return await orderBal.UpdateStatusOrder(order, status);
        }

        public async Task<Response> InsertBook(Book book, List<Author> authors, List<string> images, int cateID,
            int formID, int supplierID, int publisherID)
        {
            return await crudBookBal.CreateBookProcess(book, authors, images, cateID, formID, supplierID, publisherID);
        }

        public async Task<Response> SearchBook(string value)
        {
            return await bookBal.SearchBookForAdmin(value);
        }

        public async Task<Response> RemoveBook(string id)
        {
            return await bookBal.Delete(id);
        }

        public async Task<Response> StatisticsBookWithQuantityByMonth()
        {
            return await bookBal.StatisticsBookWithQuantityByMonth();
        }

        public async Task<Response> StatisticsTop3Users()
        {
            return await bookBal.StatisticsTop3Users();
        }

        public async Task<Response> GetListPromotion()
        {
            return await promotionBal.GetListPromotion();
        }

        public async Task<Response> GetPromotion(int id)
        {
            return await promotionBal.GetPromotion(id);
        }

        public async Task<Response> CreatePromotion(PromotionRequest promotionRequest,
            List<PromotionDetailRequest> promotionDetailRequests)
        {
            return await crudPromotionBal.CreatePromotionProcess(promotionRequest, promotionDetailRequests);
        }

        public async Task<Response> UpdatePromotion(Promotion promotion)
        {
            return await promotionBal.UpdatePromotion(promotion);
        }

        public async Task<Response> CreatePromotionDetail(PromotionDetail promotionDetail)
        {
            return await promotionBal.CreatePromotionDetail(promotionDetail);
        }

        public async Task<Response> UpdatePromotionDetail(PromotionDetail promotionDetail)
        {
            return await promotionBal.UpdatePromotionDetail(promotionDetail);
        }

        public async Task<Response> DeletePromotionDetail(int promotionID, string bookID)
        {
            return await promotionBal.DeletePromotionDetail(promotionID, bookID);
        }

        public async Task<Response> GetListUser()
        {
            return await userBal.GetListUser();
        }

        public async Task<Response> StatisticUser(int userID)
        {
            return await userBal.StatisticUser(userID);
        }

        public async Task<Response> UpdateAccountState(int userID, string state)
        {
            return await accountBal.UpdateAccountState(userID, state);
        }

        public async Task<Response> StatisticsNumberExportedOrderWithMonth()
        {
            return await orderBal.StatisticsNumberExportedOrderWithMonth();
        }

        public async Task<Response> StatisticsNumberBookSoldWithMonth()
        {
            return await bookBal.StatisticsNumberBookSoldWithMonth();
        }

        public async Task<Response> StatisticsNumberAccountWithYear()
        {
            return await accountBal.StatisticsNumberAccountWithYear();
        }
    }
}
