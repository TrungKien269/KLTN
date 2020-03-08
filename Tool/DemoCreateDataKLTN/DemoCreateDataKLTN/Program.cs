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
                PBookViewTracking pBookViewTracking = new PBookViewTracking();
                pBookViewTracking.Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
