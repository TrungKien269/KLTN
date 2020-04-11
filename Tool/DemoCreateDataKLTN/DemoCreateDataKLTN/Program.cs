using System;
using DemoCreateDataKLTN.BUS;
using DemoCreateDataKLTN.DAL;
using DemoCreateDataKLTN.Helper;
using DemoCreateDataKLTN.Models;
using DemoCreateDataKLTN.Process;

namespace DemoCreateDataKLTN
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                PSearchHistory pSearchHistory = new PSearchHistory();
                pSearchHistory.Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
