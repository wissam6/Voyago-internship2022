using System.Diagnostics.CodeAnalysis;
using System.Windows;
using System.Windows.Controls;

namespace DisplayInfoBar
{
    /// <summary>
    /// Interaction logic for InforBarToolWindowControl.
    /// </summary>
    public partial class InforBarToolWindowControl : UserControl
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="InforBarToolWindowControl"/> class.
        /// </summary>
        public InforBarToolWindowControl()
        {
            this.InitializeComponent();

            InfoBarService.Instance.ShowInfoBar("Main window InforBar message.");
        }

        /// <summary>
        /// Handles click on the button by displaying a message box.
        /// </summary>
        /// <param name="sender">The event sender.</param>
        /// <param name="e">The event args.</param>
        [SuppressMessage("Microsoft.Globalization", "CA1300:SpecifyMessageBoxOptions", Justification = "Sample code")]
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1300:ElementMustBeginWithUpperCaseLetter", Justification = "Default event handler naming pattern")]
        private void button1_Click(object sender, RoutedEventArgs e)
        {
            InfoBarService.Instance.ShowInfoBar("Tool window InforBar message.", InforBarToolWindowCommand.ToolWindow);
        }
    }
}