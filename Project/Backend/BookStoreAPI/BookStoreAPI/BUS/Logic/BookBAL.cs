using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Statistics;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class BookBAL : IReporsitory<Book, string, Response>
    {
        private BookStoreContext context;

        public BookBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> GetList()
        {
            try
            {
                var list = await context.Book.Where(x =>
                        x.OriginalPrice > 50000 && x.OriginalPrice < 130000 && x.Status.Equals("Available"))
                    .OrderBy(x => x.Id)
                    .Take(30).Skip(10).ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListLowestPriceBook()
        {
            try
            {
                var list = await context.Book.Where(x =>
                        x.OriginalPrice > 50000 && x.OriginalPrice < 130000 && x.Status.Equals("Available"))
                    .OrderBy(x => x.Id)
                    .Take(30).Skip(10).ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetList3FeaturedBook()
        {
            try
            {
                var list = await context.Book.Include(x => x.AuthorBook).ThenInclude(x => x.Author)
                    .Include(x => x.BookCategory).ThenInclude(x => x.Cate)                    
                    .Where(x => x.Status.Equals("Available"))
                    .OrderByDescending(x => x.CurrentPrice)
                    .Take(3).ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetList6BestSaleBook()
        {
            try
            {
                var list = await context.Book.Include(x => x.AuthorBook).ThenInclude(x => x.Author)
                    .Include(x => x.BookCategory).ThenInclude(x => x.Cate)
                    .Where(x => x.Status.Equals("Available"))
                    .OrderBy(x => x.CurrentPrice)
                    .Take(6).ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListRelatedBooks(List<string> relatedList)
        {
            try
            {
                var list = await context.Book.Where(x => x.Id.Equals(relatedList[0]) || x.Id.Equals(relatedList[1]) 
                                                    || x.Id.Equals(relatedList[2]) || x.Id.Equals(relatedList[3]) 
                                                    || x.Id.Equals(relatedList[4])).ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetListSuggestedBooks(List<string> relatedList)
        {
            try
            {
                var list = await context.Book.Where(x => x.Id.Equals(relatedList[0]) || x.Id.Equals(relatedList[1])
                                                         || x.Id.Equals(relatedList[2]) || x.Id.Equals(relatedList[3])
                                                         || x.Id.Equals(relatedList[4]) || x.Id.Equals(relatedList[5]))
                    .ToListAsync();
                return new Response("Success", true, 0, list);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetBookFromFamousPublisher(string id)
        {
            try
            {
                var publisher = await context.FamousPublisher.Where(x => x.Id.Equals(int.Parse(id))).FirstOrDefaultAsync();
                var listBook = await context.PublisherBook.Where(x =>
                        x.Publisher.Name.Contains(publisher.Name, StringComparison.CurrentCultureIgnoreCase) &&
                        x.Book.Status.Equals("Available"))
                    .Select(x => x.Book).Take(6).ToListAsync();
                foreach (var book in listBook)
                {
                    book.Id = SecureHelper.GetSecureOutput(book.Id);
                }
                return new Response("Success", true, 1, listBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> FilterBooksFromListFamousPublisher(List<int> cateIDs)
        {
            try
            {
                var publishers = await context.FamousPublisher.Where(x => cateIDs.Any(y => y.Equals(x.Id)))
                    .ToListAsync();
                var listBook = new List<Book>();
                listBook = await context.PublisherBook.Where(x =>
                        publishers.Any(
                            y => x.Publisher.Name.Contains(y.Name, StringComparison.CurrentCultureIgnoreCase))
                        && x.Book.Status.Equals("Available") && x.Book.CurrentPrice <= 100000)
                    .Select(x => x.Book).OrderBy(x => x.CurrentPrice).ToListAsync();
                return new Response("Success", true, 1, listBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Insert(Book obj)
        {
            try
            {
                var res = await context.Book.Where(x => x.Id.Equals(obj.Id, StringComparison.CurrentCultureIgnoreCase))
                    .FirstOrDefaultAsync();
                if (res is null)
                {
                    obj.Status = "Available";
                    await context.Book.AddAsync(obj);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, obj);
                }
                else
                {
                    return new Response("This book has been added to system!", false, 1, obj);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertAuthorsBook(string bookID, int authorID)
        {
            try
            {
                var authorBook = new AuthorBook
                {
                    BookId = bookID,
                    AuthorId = authorID
                };
                await context.AuthorBook.AddAsync(authorBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, authorBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllAuthorsBook(string bookID)
        {
            try
            {
                var authorBooks = await context.AuthorBook.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.AuthorBook.RemoveRange(authorBooks);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, authorBooks.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertImagesBook(string bookID, int imageID, string path)
        {
            try
            {
                var imageBook = new ImageBook
                {
                    BookId = bookID,
                    ImageId = imageID,
                    Path = path
                };
                await context.ImageBook.AddAsync(imageBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, imageBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllImagesBook(string bookID)
        {
            try
            {
                var imageBooks = await context.ImageBook.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.ImageBook.RemoveRange(imageBooks);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, imageBooks.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertCategoryBook(string bookID, int cateID)
        {
            try
            {
                var bookCategory = new BookCategory
                {
                    BookId = bookID,
                    CateId = cateID
                };
                await context.BookCategory.AddAsync(bookCategory);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, bookCategory);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllCategoryBook(string bookID)
        {
            try
            {
                var categories = await context.BookCategory.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.BookCategory.RemoveRange(categories);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, categories.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertFormBook(string bookID, int formID)
        {
            try
            {
                var formBook = new FormBook
                {
                    BookId = bookID,
                    FormId = formID
                };
                await context.FormBook.AddAsync(formBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, formBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllFormBook(string bookID)
        {
            try
            {
                var forms = await context.FormBook.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.FormBook.RemoveRange(forms);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, forms.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertPublisherBook(string bookID, int publisherID)
        {
            try
            {
                var publisherBook = new PublisherBook
                {
                    BookId = bookID,
                    PublisherId = publisherID
                };
                await context.PublisherBook.AddAsync(publisherBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, publisherBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllPublisherBook(string bookID)
        {
            try
            {
                var publishers = await context.PublisherBook.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.PublisherBook.RemoveRange(publishers);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, publishers.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> InsertSupplierrBook(string bookID, int supplierID)
        {
            try
            {
                var supplierBook = new SupplierBook
                {
                    BookId = bookID,
                    SupplierId = supplierID
                };
                await context.SupplierBook.AddAsync(supplierBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, supplierBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> DeleteAllSupplierBook(string bookID)
        {
            try
            {
                var suppliers = await context.SupplierBook.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                context.SupplierBook.RemoveRange(suppliers);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, suppliers.Count);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Delete(string id)
        {
            try
            {
                var book = await context.Book.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                book.Status = "Inavailable";
                context.Book.Update(book);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, book);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Update(Book obj)
        {
            try
            {
                var findBook = await context.Book.Where(x => x.Id.Equals(obj.Id)).FirstOrDefaultAsync();
                //findBook.Id = SecureHelper.GetOriginalInput(findBook.Id);
                findBook.Name = obj.Name;
                findBook.Image = obj.Image;
                findBook.CurrentPrice = obj.CurrentPrice;
                findBook.OriginalPrice = obj.OriginalPrice;
                findBook.NumOfPage = obj.NumOfPage;
                findBook.Weight = obj.Weight;
                findBook.ReleaseYear = obj.ReleaseYear;
                findBook.Summary = obj.Summary;

                context.Book.Update(findBook);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, findBook);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetObject(string id)
        {
            try
            {
                var book = await context.Book.Include(x => x.AuthorBook).ThenInclude(x => x.Author)
                    .Include(x => x.ImageBook).Include(x => x.PublisherBook).ThenInclude(x => x.Publisher)
                    .Include(x => x.FormBook).ThenInclude(x => x.Form)
                    .Include(x => x.SupplierBook).ThenInclude(x => x.Supplier)
                    .Include(x => x.BookCategory).ThenInclude(x => x.Cate)
                    .Where(x => x.Id.Equals(id) && x.Status.Equals("Available")).FirstOrDefaultAsync();
                if (book is null)
                {
                    return new Response("Cannot find this book", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, book);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetBookWithSecureID(string id)
        {
            try
            {
                var book = await context.Book.Include(x => x.AuthorBook).ThenInclude(x => x.Author)
                    .Include(x => x.ImageBook).Include(x => x.PublisherBook).ThenInclude(x => x.Publisher)
                    .Include(x => x.FormBook).ThenInclude(x => x.Form)
                    .Include(x => x.SupplierBook).ThenInclude(x => x.Supplier)
                    .Where(x => x.Id.Equals(id) && x.Status.Equals("Available")).FirstOrDefaultAsync();
                if (book is null)
                {
                    return new Response("Cannot find this book", false, 0, null);
                }
                else
                {
                    book.Id = SecureHelper.GetSecureOutput(book.Id);
                    return new Response("Success", true, 1, book);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetBookOnly(string id)
        {
            try
            {
                var book = await context.Book.Where(x => x.Id.Equals(id) && x.Status.Equals("Available"))
                    .FirstOrDefaultAsync();
                if (book is null)
                {
                    return new Response("Cannot find this book", false, 0, null);
                }
                else
                {
                    book.Id = SecureHelper.GetSecureOutput(book.Id);
                    return new Response("Success", true, 1, book);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetBookByCategory(string category)
        {
            try
            {
                var books = new List<Book>();
                books = await context.Book.Where(x => x.BookCategory.All(y => y.Cate.Cate.Name.Equals(category)) &&
                                                 x.Status.Equals("Available"))
                    .OrderByDescending(x => x.CurrentPrice).ToListAsync();
                return new Response("Success", true, 1, books);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetBookBySubCategory(string subcategory)
        {
            try
            {
                var books = new List<Book>();
                books = await context.Book.Where(x => x.BookCategory.All(y => y.Cate.Name.Equals(subcategory)) &&
                                                 x.Status.Equals("Available"))
                    .OrderByDescending(x => x.CurrentPrice).ToListAsync();
                return new Response("Success", true, books.Count, books);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> SearchBook(string value)
        {
            try
            {
                var books = new List<Book>();
                books = await context.Book.Include(x => x.BookCategory)
                    .Where(x => x.Name.Contains(value, StringComparison.CurrentCultureIgnoreCase) ||
                                x.Id.Contains(value, StringComparison.CurrentCultureIgnoreCase))
                    .Where(x => x.Status.Equals("Available")).ToListAsync();
                return new Response("Success", true, books.Count, books);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> SearchBookForAdmin(string value)
        {
            try
            {
                var books = await context.Book.Include(x => x.AuthorBook).ThenInclude(x => x.Author)
                    .Include(x => x.ImageBook).Include(x => x.PublisherBook).ThenInclude(x => x.Publisher)
                    .Include(x => x.FormBook).ThenInclude(x => x.Form)
                    .Include(x => x.SupplierBook).ThenInclude(x => x.Supplier)
                    .Include(x => x.BookCategory).ThenInclude(x => x.Cate)
                    .Where(x =>
                        x.Name.Contains(value, StringComparison.CurrentCultureIgnoreCase) ||
                        x.Id.Contains(value, StringComparison.CurrentCultureIgnoreCase)).Take(2)
                    .ToListAsync();
                //foreach (var book in books)
                //{
                //    book.Id = SecureHelper.GetSecureOutput(book.Id);
                //}
                return new Response("Success", true, books.Count, books);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetRatingInfo(string bookID)
        {
            try
            {
                var ListRecord = await context.Rating.Where(x => x.BookId.Equals(bookID)).ToListAsync();
                if (ListRecord.Count is 0)
                {
                    List<double> RatingInfo = new List<double>
                    {
                        0,
                        0
                    };
                    return new Response("Success", true, 1, RatingInfo);
                }
                else
                {
                    var sumOfPoint = ListRecord.Sum(x => x.Point);
                    var avgPoint = Math.Round((double)sumOfPoint / ListRecord.Count, 1);
                    List<double> RatingInfo = new List<double>
                    {
                        avgPoint,
                        ListRecord.Count
                    };
                    return new Response("Success", true, 1, RatingInfo);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> RateBook(Rating rating)
        {
            try
            {
                var check_rating = await context.Rating
                    .Where(x => x.BookId.Equals(rating.BookId) && x.UserId.Equals(rating.UserId)).FirstOrDefaultAsync();
                if (check_rating is null)
                {
                    await context.Rating.AddAsync(rating);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, rating);
                }
                else
                {
                    check_rating.Point = rating.Point;
                    check_rating.DateTime = DateTime.Now;
                    context.Rating.Update(check_rating);
                    await context.SaveChangesAsync();
                    return new Response("Success", true, 1, rating);

                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> StatisticsBookWithQuantityByMonth()
        {
            try
            {
                var books = await context.OrderDetail.Include(x => x.Book).Include(x => x.Order)
                    .Where(x => x.Order.Status.Equals("Delivered"))
                    .GroupBy(x => x.Book).Select(x => new BookWithQuantity
                    {
                        book = x.Key,
                        quantity = x.Sum(y => y.Quantity)
                    }).OrderByDescending(x => x.quantity).Take(10).ToListAsync();

                return new Response("Success", true, 1, books.OrderBy(x => x.book.Id).ToList());
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> StatisticsTop3Users()
        {
            try
            {
                var users = await context.OrderDetail.Include(x => x.Book).Include(x => x.Order)
                    .Where(x => x.Order.Status.Equals("Delivered"))
                    .GroupBy(x => x.Order.User).Select(x => new TopUser
                    {
                        user = x.Key,
                        numberOfBook = x.Sum(y => y.Quantity)
                    }).OrderByDescending(x => x.numberOfBook).Take(3).ToListAsync();
                return new Response("Success", true, 1, users);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
