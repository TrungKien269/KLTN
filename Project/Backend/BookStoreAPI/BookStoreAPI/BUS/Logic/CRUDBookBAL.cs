using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;

namespace BookStoreAPI.BUS.Logic
{
    public class CRUDBookBAL
    {
        private BookBAL bookBal;
        private AuthorBAL authorBal;

        public CRUDBookBAL()
        {
            bookBal = new BookBAL();
            authorBal = new AuthorBAL();
        }

        public async Task<Response> CreateBookProcess(Book book, List<Author> authors, List<string> images, int cateID,
            int formID, int supplierID, int publisherID)
        {
            try
            {
                var findBook = await bookBal.GetBookOnly(book.Id);
                if (findBook.Status == false)
                {
                    var res = await bookBal.Insert(book);
                    if (res.Status)
                    {
                        foreach (var author in authors)
                        {
                            var response = await authorBal.InsertAuthor(author);
                            await bookBal.InsertAuthorsBook(book.Id, (response.Obj as Author).Id);
                        }

                        for (int i = 0; i < images.Count; i++)
                        {
                            await bookBal.InsertImagesBook(book.Id, i + 1, images[i]);
                        }

                        await bookBal.InsertCategoryBook(book.Id, cateID);
                        await bookBal.InsertFormBook(book.Id, formID);
                        await bookBal.InsertSupplierrBook(book.Id, supplierID);
                        await bookBal.InsertPublisherBook(book.Id, publisherID);

                        return new Response("Success", true, 1, book);
                    }
                    else
                    {
                        return res;
                    }
                }
                else
                {
                    return await UpdateBookProcess(book, authors, images, cateID, formID, supplierID, publisherID);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateBookProcess(Book book, List<Author> authors, List<string> images, int cateID,
            int formID, int supplierID, int publisherID)
        {
            try
            {
                var res = await bookBal.Update(book);
                if (res.Status)
                {
                    await bookBal.DeleteAllAuthorsBook(book.Id);
                    await bookBal.DeleteAllCategoryBook(book.Id);
                    await bookBal.DeleteAllFormBook(book.Id);
                    await bookBal.DeleteAllImagesBook(book.Id);
                    await bookBal.DeleteAllPublisherBook(book.Id);
                    await bookBal.DeleteAllSupplierBook(book.Id);

                    foreach (var author in authors)
                    {
                        var response = await authorBal.InsertAuthor(author);
                        await bookBal.InsertAuthorsBook(book.Id, (response.Obj as Author).Id);
                    }

                    for (int i = 0; i < images.Count; i++)
                    {
                        await bookBal.InsertImagesBook(book.Id, i + 1, images[i]);
                    }

                    await bookBal.InsertCategoryBook(book.Id, cateID);
                    await bookBal.InsertFormBook(book.Id, formID);
                    await bookBal.InsertSupplierrBook(book.Id, supplierID);
                    await bookBal.InsertPublisherBook(book.Id, publisherID);

                    return new Response("Success", true, 1, book);
                }
                else
                {
                    return res;
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
