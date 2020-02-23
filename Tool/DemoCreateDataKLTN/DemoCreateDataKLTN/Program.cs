using System;
using DemoCreateDataKLTN.BUS;
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
                POrder pOrder = new POrder();
                pOrder.Execute();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
