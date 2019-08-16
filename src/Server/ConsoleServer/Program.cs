using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net.Config;
using RatingTool.Server.Service;

namespace ConsoltServer
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlConfigurator.Configure();
            Task.Run(() =>
            {
                ServiceManagement.Instance.Start();
            });

            Console.WriteLine("=============> Press any key to stop");
            Console.ReadKey();
            ServiceManagement.Instance.Stop();
        }
    }
}
