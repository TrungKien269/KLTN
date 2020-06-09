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
                POrder pOrder = new POrder();
                for (int i = 0; i < 5; i++)
                {
                    pOrder.Execute();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
