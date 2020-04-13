using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;

namespace BookStoreAPI.BUS.Control
{
    public class ListBookBAL
    {
        private CategoryBAL categoryBal;
        private PublisherBAL publisherBal;
        private BookBAL bookBal;

        public ListBookBAL()
        {
            categoryBal = new CategoryBAL();
            publisherBal = new PublisherBAL();
            bookBal = new BookBAL();
        }

        public async Task<Response> GetListCategory()
        {
            return await categoryBal.GetList();
        }

        public async Task<Response> GetListPublisher()
        {
            return await publisherBal.GetFamousList();
        }

        //public async Task<Response> GetListBookByCategory(string category, int skipNumber, int indexPriceFilter)
        //{
        //    return await bookBal.GetBookByCategory(category, skipNumber, indexPriceFilter);
        //}

        public async Task<Response> GetListBookByCategory(string category)
        {
            return await bookBal.GetBookByCategory(category);
        }

        public async Task<Response> GetListBookBySubCategory(string subcategory)
        {
            return await bookBal.GetBookBySubCategory(subcategory);
        }

        public async Task<Response> GetListBookGetBookByCategoryAndPrice(int abovePrice, int belowPrice,
            string category)
        {
            return await bookBal.GetBookByCategoryAndPrice(abovePrice, belowPrice, category);
        }

        public async Task<Response> SearchBook(string value)
        {
            return await bookBal.SearchBook(value);
        }

        public async Task<Response> FilterBook(List<int> cateIDs)
        {
            return await bookBal.FilterBooksFromListFamousPublisher(cateIDs);
        }
    }
}
