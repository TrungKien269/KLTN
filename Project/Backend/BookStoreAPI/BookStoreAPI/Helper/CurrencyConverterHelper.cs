using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fizzler.Systems.HtmlAgilityPack;
using HtmlAgilityPack;

namespace BookStoreAPI.Helper
{
    public static class CurrencyConverterHelper
    {
        public static double USDCurrency()
        {
            try
            {
                HtmlWeb htmlWeb = new HtmlWeb()
                {
                    AutoDetectEncoding = false,
                    OverrideEncoding = Encoding.UTF8
                };
                var url = "https://transferwise.com/gb/currency-converter/vnd-to-usd-rate?amount=1";
                HtmlDocument document = htmlWeb.Load(url, "GET");
                var spanResult = document.DocumentNode.QuerySelector("div.input-group > input#cc-amount-to")
                    .Attributes["value"].Value;
                return double.Parse(spanResult);
            }
            catch (Exception e)
            {
                return -1;
            }
        }
    }
}
