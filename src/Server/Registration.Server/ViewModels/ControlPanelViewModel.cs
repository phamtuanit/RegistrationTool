using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MEF.Launcher.Contract;
using MEF.Launcher.Contract.IoC;
using RatingTool.Server.Service;

namespace RatingTool.Server.ViewModels
{
    [PropertyChanged.AddINotifyPropertyChangedInterface]
    [Export]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class ControlPanelViewModel
    {
        /// <summary>
        /// The application log
        /// </summary>
        private IFooterBarManager appLog = SimpleIoC.Get<IFooterBarManager>();

        /// <summary>
        /// Gets or sets a value indicating whether this instance is started.
        /// </summary>
        /// <value>
        ///   <c>true</c> if this instance is started; otherwise, <c>false</c>.
        /// </value>
        public bool IsStarted { get; set; }

        /// <summary>
        /// Starts this instance.
        /// </summary>
        public void Start()
        {
            if (ServiceManagement.Instance.Start())
            {
                appLog.SetMessage("The service has been started");
            }
            else
            {
                appLog.SetMessage("The service could not start");
            }
        }

        /// <summary>
        /// Stops this instance.
        /// </summary>
        public void Stop()
        {
            if (ServiceManagement.Instance.Stop())
            {
                appLog.SetMessage("The service is stopped");
            }
            else
            {
                appLog.SetMessage("The service could not stop");
            }
        }
    }
}
