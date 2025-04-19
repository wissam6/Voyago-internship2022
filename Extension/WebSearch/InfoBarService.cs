using Microsoft;
using Microsoft.VisualStudio.Imaging;
using Microsoft.VisualStudio.Shell;
using Microsoft.VisualStudio.Shell.Interop;
using System;
using System.Windows.Forms;

namespace WebSearch
{
    internal class InfoBarService : IVsInfoBarUIEvents
    {

        private readonly IServiceProvider serviceProvider;
        private uint cookie;

        private InfoBarService(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public static InfoBarService Instance { get; private set; }

        public static void Initialize(IServiceProvider serviceProvider)
        {
            if (Instance == null)
            {
                Instance = new InfoBarService(serviceProvider);
            }
        }

        public void ShowInfoBar(string message, int type, ToolWindowPane toolWindow = null)
        {
            Microsoft.VisualStudio.Shell.ThreadHelper.ThrowIfNotOnUIThread();

            // Construct an InfoBar.
            InfoBarTextSpan text = new InfoBarTextSpan(message);
            InfoBarHyperlink yes = new InfoBarHyperlink("Yes", "yes");
            InfoBarHyperlink no = new InfoBarHyperlink("No", "no");
            InfoBarButton noButton = new InfoBarButton("No", "no");
            InfoBarTextSpan[] spans = new InfoBarTextSpan[] { text };
            InfoBarActionItem[] actions = new InfoBarActionItem[] { yes, no };

            InfoBarModel infoBarModel;

            if (type==2)
            {
                infoBarModel = new InfoBarModel(spans, actions, KnownMonikers.StatusInformation, isCloseButtonVisible: true);
            }
            else
            {
                infoBarModel = new InfoBarModel(spans, KnownMonikers.StatusInformation, isCloseButtonVisible: true);
            }
            
            var factory = serviceProvider.GetService(typeof(SVsInfoBarUIFactory)) as IVsInfoBarUIFactory;

            Assumes.Present(factory);
            IVsInfoBarUIElement element = factory.CreateInfoBar(infoBarModel);
            element.Advise(this, out cookie);

            if (toolWindow == null)
            {
                var shell = serviceProvider.GetService(typeof(SVsShell)) as IVsShell;

                if (shell != null)
                {
                    shell.GetProperty((int)__VSSPROPID7.VSSPROPID_MainWindowInfoBarHost, out var obj);
                    var host = (IVsInfoBarHost)obj;
                    if (host == null)
                    {
                        return;
                    }
                    host.AddInfoBar(element);
                }
            }
            else
            {
                toolWindow.AddInfoBar(element);
            }
        }

        public void OnActionItemClicked(IVsInfoBarUIElement infoBarUIElement, IVsInfoBarActionItem actionItem)
        {
            ThreadHelper.ThrowIfNotOnUIThread();
            string context = (string)actionItem.ActionContext;
            if (string.Equals(context, "yes", StringComparison.OrdinalIgnoreCase))
            {
                MessageBox.Show("Please go to Tools>Options>WebSearch>SearchEngine and select TelerikSearchEngine");
                infoBarUIElement.Close();
            }
            else
            {
                //MessageBox.Show("NO is clicked.");
                infoBarUIElement.Close();
            }
        }

        public void OnClosed(IVsInfoBarUIElement infoBarUIElement)
        {
            Microsoft.VisualStudio.Shell.ThreadHelper.ThrowIfNotOnUIThread();

            infoBarUIElement.Unadvise(cookie);
        }
    }
}