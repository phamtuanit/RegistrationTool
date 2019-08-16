using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;

namespace RatingTool.Server.Service
{
    public class ServiceManagement
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly log4net.ILog Logger = log4net.LogManager.GetLogger(typeof(ServiceManagement));

        /// <summary>
        /// Gets the instance.
        /// </summary>
        /// <value>
        /// The instance.
        /// </value>
        public static ServiceManagement Instance { get; } = new ServiceManagement();

        /// <summary>
        /// The service
        /// </summary>
        private IDisposable service = null;

        /// <summary>
        /// The base address
        /// </summary>
        private string baseAddress = @"http://127.0.0.1:1999";

        /// <summary>
        /// Prevents a default instance of the <see cref="ServiceManagement"/> class from being created.
        /// </summary>
        private ServiceManagement()
        {
            var assemFile = typeof(ServiceManagement).Assembly.Location;
            var configFile = ConfigurationManager.OpenExeConfiguration(assemFile);
            var settings = configFile.AppSettings.Settings;

            this.baseAddress = settings["Address"].Value;
        }

        /// <summary>
        /// Starts this instance.
        /// </summary>
        /// <returns></returns>
        public bool Start()
        {
            try
            {
                if (this.service == null)
                {
                    this.service = WebApp.Start(url: baseAddress);
                }
                Logger.Info($"The service has been started at [{baseAddress}].");
                return true;
            }
            catch (Exception ex)
            {
                Logger.Error($"The service could not be running at [{baseAddress}].", ex);
            }
            return false;
        }

        /// <summary>
        /// Stops this instance.
        /// </summary>
        /// <returns></returns>
        public bool Stop()
        {
            try
            {
                var tmpService = this.service;
                this.service = null;

                if (tmpService != null)
                {
                    tmpService.Dispose();
                    Logger.Info("The service is stopped.");
                }
                return true;
            }
            catch (Exception ex)
            {
                Logger.Warn($"The service could not stop.", ex);
            }
            return false;
        }
    }
}
