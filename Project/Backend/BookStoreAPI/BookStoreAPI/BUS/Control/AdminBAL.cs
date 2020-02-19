using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Control
{
    public class AdminBAL
    {
        private AccountBAL accountBal;
        private OrderBAL orderBal;
        private BookBAL bookBal;
        private AuthorBAL authorBal;
        private CRUDBookBAL crudBookBal;
        private CategoryBAL categoryBal;
        private FormBookBAL formBookBal;
        private SupplierBAL supplierBal;
        private PublisherBAL publisherBal;

        public AdminBAL()
        {
            accountBal = new AccountBAL();
            orderBal = new OrderBAL();
            bookBal = new BookBAL();
            authorBal = new AuthorBAL();
            crudBookBal = new CRUDBookBAL();
            categoryBal = new CategoryBAL();
            formBookBal = new FormBookBAL();
            supplierBal = new SupplierBAL();
            publisherBal = new PublisherBAL();
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

        public async Task<Response> GetOrder(string secureID)
        {
            //return await orderBal.GetOrder(SecureHelper.GetOriginalInput(secureID));
            return await orderBal.GetOrder(secureID);
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
    }
}
