using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using BookStoreAPI.Models.Receipt;
using CsvHelper;
using Microsoft.AspNetCore.Http;

namespace BookStoreAPI.Helper
{
    public static class ImportReceiptHelper
    {
        public static async Task<string> UploadFile(ImportReceipt receipt, IFormFile file)
        {
            var fileName = receipt.ImportDate.ToString("yyyyMMdd") + "_" + receipt.Id + Path.GetExtension(file.FileName);
            var filePath = Path.Combine("Files/ImportFile", fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }
            return filePath;
        }

        public static async Task<string> UpdateFile(ImportReceipt receipt)
        {
            var receiptBal = new ImportReceiptBAL();
            var currentReceiptResponse = await receiptBal.GetReceipt(receipt.Id);
            if (currentReceiptResponse.Status)
            {
                var currentReceipt = currentReceiptResponse.Obj as ImportReceipt;
                var fileName = currentReceipt.ImportDate.ToString("yyyyMMdd") + "_" + currentReceipt.Id + ".csv";
                var filePath = Path.Combine("Files/ImportFile", fileName);
                FileInfo file = new FileInfo(filePath);
                if (file.Exists)
                {
                    var newFileName = receipt.ImportDate.ToString("yyyyMMdd") + "_" + receipt.Id + ".csv";
                    var newFilePath = Path.Combine("Files/ImportFile", newFileName);
                    file.MoveTo(newFilePath);
                    return filePath;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public static async Task<Response> InsertBookNumber(string filePath, ImportReceipt receipt)
        {
            ImportReceiptBAL importReceiptBal = new ImportReceiptBAL();
            StreamReader reader = new StreamReader(filePath);
            var csv = new CsvReader(reader);
            csv.Configuration.Delimiter = ",";
            var BookNumberList = new List<BookNumber>();
            try
            {
                while (csv.Read())
                {
                    var record = csv.GetRecord<BookReceipt>();
                    BookNumberList.Add(new BookNumber()
                    {
                        BookId = record.ISBN,
                        Amount = record.Amount
                    });
                }
                var response = await importReceiptBal.ImportReceiptTransaction(BookNumberList, receipt);
                return response;
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
