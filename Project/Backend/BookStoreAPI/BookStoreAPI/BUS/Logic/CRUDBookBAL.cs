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
        private FormBookBAL formBookBal;
        private SupplierBAL supplierBal;
        private PublisherBAL publisherBal;
        private RawBookBAL rawBookBal;
        private BookNumberBAL bookNumberBal;

        public CRUDBookBAL()
        {
            bookBal = new BookBAL();
            authorBal = new AuthorBAL();
            formBookBal = new FormBookBAL();
            supplierBal = new SupplierBAL();
            publisherBal = new PublisherBAL();
            rawBookBal = new RawBookBAL();
            bookNumberBal = new BookNumberBAL();
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
                        await bookNumberBal.CreateBookNumber(book.Id);

                        await CreateRawBookProcess(book, authors, cateID, formID, supplierID, publisherID);

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

                    await UpdateRawBookProcess(book, authors, cateID, formID, supplierID, publisherID);

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

        public async Task<Response> CreateRawBookProcess(Book book, List<Author> authors, 
            int cateID, int formID, int supplierID, int publisherID)
        {
            try
            {
                var rawbook = new RawBook
                {
                    Id = book.Id,
                    Image = book.Image,
                    Name = book.Name,
                    ReleaseYear = book.ReleaseYear,
                    Author = ProcessAuthors(authors),
                    NumOfPage = book.NumOfPage,
                    Summary = book.Summary,
                    Form = ((await formBookBal.GetFormBook(formID)).Obj as Form).Name,
                    Price = book.OriginalPrice,
                    Weight = book.Weight,
                    Supplier = ((await supplierBal.GetSupplier(supplierID)).Obj as Supplier).Name,
                    Publisher = ((await publisherBal.GetPublisher(publisherID)).Obj as Publisher).Name,
                };

                await rawBookBal.Insert(rawbook);
                return new Response("Success", true, 1, rawbook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> UpdateRawBookProcess(Book book, List<Author> authors,
            int cateID, int formID, int supplierID, int publisherID)
        {
            try
            {
                var rawbook = new RawBook
                {
                    Id = book.Id,
                    Image = book.Image,
                    Name = book.Name,
                    ReleaseYear = book.ReleaseYear,
                    Author = ProcessAuthors(authors),
                    NumOfPage = book.NumOfPage,
                    Summary = book.Summary,
                    Form = ((await formBookBal.GetFormBook(formID)).Obj as Form).Name,
                    Price = book.OriginalPrice,
                    Weight = book.Weight,
                    Supplier = ((await supplierBal.GetSupplier(supplierID)).Obj as Supplier).Name,
                    Publisher = ((await publisherBal.GetPublisher(publisherID)).Obj as Publisher).Name,
                };

                await rawBookBal.Update(rawbook);
                return new Response("Success", true, 1, rawbook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public string ProcessAuthors(List<Author> authors)
        {
            string author = "";
            foreach (var auth in authors)
            {
                author += auth.Name + ", ";
            }
            return author.Substring(0, author.Length - 2);
        }
    }
}
