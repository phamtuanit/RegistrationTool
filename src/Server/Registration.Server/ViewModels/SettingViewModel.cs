using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MEF.Launcher.Contract;
using MEF.Launcher.Contract.IoC;
using MEF.Launcher.Platform.Screen;
using RatingTool.Server.Service;

namespace RatingTool.Server.ViewModels
{
    [Export]
    [PartCreationPolicy(CreationPolicy.Shared)]
    public class SettingViewModel : ScreenBase
    {
        /// <summary>
        /// Gets or Sets the Display Name
        /// </summary>
        public override string DisplayName { get; set; } = "Registration";

        /// <summary>
        /// Gets or sets the control panel.
        /// </summary>
        /// <value>
        /// The control panel.
        /// </value>
        public ControlPanelViewModel ControlPanel { get; set; } = SimpleIoC.Get<ControlPanelViewModel>();

        #region Command

        #endregion
    }
}
