using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RatingTool.Server.Data
{
    /// <summary>
    /// 
    /// </summary>
    public class DataManagement
    {
        /// <summary>
        /// The logger
        /// </summary>
        private readonly log4net.ILog Logger = log4net.LogManager.GetLogger(typeof(DataManagement));

        /// <summary>
        /// Gets the instance.
        /// </summary>
        /// <value>
        /// The instance.
        /// </value>
        public static DataManagement Instance { get; } = new DataManagement();

        /// <summary>
        /// The json serializer
        /// </summary>
        private JsonSerializer jsonSerializer = new JsonSerializer();

        /// <summary>
        /// The registration file path
        /// </summary>
        private readonly string registrationFilePath;

        /// <summary>
        /// The reference file path
        /// </summary>
        private readonly string referenceFilePath;

        /// <summary>
        /// The reference data
        /// </summary>
        private string referenceData;

        /// <summary>
        /// The registration data
        /// </summary>
        private string registrationData;

        /// <summary>
        /// Prevents a default instance of the <see cref="DataManagement"/> class from being created.
        /// </summary>
        private DataManagement()
        {
            var assemFile = typeof(DataManagement).Assembly.Location;
            Logger.Info($"Load configuration file: [{assemFile}]");

            var configFile = ConfigurationManager.OpenExeConfiguration(assemFile);
            var settings = configFile.AppSettings.Settings;

            this.registrationFilePath = Path.Combine(Directory.GetCurrentDirectory(), settings["RegistrationDataFile"].Value);
            this.referenceFilePath = Path.Combine(Directory.GetCurrentDirectory(), settings["ReferenceDataFile"].Value);

            // Load data
            this.LoadReferenceData();
            this.LoadRegistrationData();
        }

        /// <summary>
        /// Loads the registration data.
        /// </summary>
        /// <returns></returns>
        public string LoadRegistrationData()
        {
            if (File.Exists(this.registrationFilePath))
            {
                this.registrationData = File.ReadAllText(this.registrationFilePath);
            }
            else
            {
                this.referenceData = "[]";
            }
            return this.registrationData;
        }

        /// <summary>
        /// Saves the registration data.
        /// </summary>
        /// <param name="registrationStr">The registration string.</param>
        public void SaveRegistrationData(string registrationStr)
        {
            try
            {
                File.WriteAllText(this.registrationFilePath, registrationStr);
            }
            catch (Exception ex)
            {
                Logger.Error($"Could not save registration data at [{this.registrationFilePath}].", ex);
                throw;
            }
        }

        /// <summary>
        /// Loads the reference Data.
        /// </summary>
        /// <returns></returns>
        public string LoadReferenceData()
        {
            if(File.Exists(this.referenceFilePath))
            {
                this.referenceData = File.ReadAllText(this.referenceFilePath);
            }
            else
            {
                this.referenceData = "[]";
            }
            return this.referenceData;
        }

        /// <summary>
        /// Saves the reference data.
        /// </summary>
        /// <param name="refJsonStr">The reference json string.</param>
        public void SaveReferenceData(string refJsonStr)
        {
            try
            {
                File.WriteAllText(this.referenceFilePath, refJsonStr);
            }
            catch (Exception ex)
            {
                Logger.Error($"Could not save reference data at [{this.referenceFilePath}].", ex);
                throw;
            }
        }
    }
}
