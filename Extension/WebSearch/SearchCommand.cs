using EnvDTE;
using Microsoft;
using Microsoft.VisualStudio.Shell;
using Microsoft.VisualStudio.Shell.Interop;
using System;
using System.ComponentModel.Design;
using System.Web;
using WebSearch.Options;
using Task = System.Threading.Tasks.Task;
using System.Diagnostics;
using VSLangProj;
using System.ComponentModel;
using Microsoft.VisualStudio.ComponentModelHost;
using NuGet.VisualStudio;
using System.Collections.Generic;

namespace WebSearch
{
    /// <summary>
    /// Command handler
    /// </summary>
    internal sealed class SearchCommand
    {
        public SearchEngine oldSearchUrl;

        //private IComponent myComponent;
        //public static VSLangProj VSLangsProjInstance;

        /// <summary>
        /// Command ID.
        /// </summary>
        public const int CommandId = 0x0100;

        /// <summary>
        /// Command menu group (command set GUID).
        /// </summary>
        public static readonly Guid CommandSet = new Guid("768141fe-b8e5-4f94-9c2a-809403e8f215");

        /// <summary>
        /// Visual Studio automation object instance.
        /// </summary>
        public static DTE DteInstance;


        ///<summary>
        ///</summary>
        public static IVsOutputWindowPane OutputWindow;

        /// <summary>
        /// VS Package that provides this command, not null.
        /// </summary>
        private readonly AsyncPackage package;

        /// <summary>
        /// Initializes a new instance of the <see cref="SearchCommand"/> class.
        /// Adds our command handlers for menu (commands must exist in the command table file)
        /// </summary>
        /// <param name="package">Owner package, not null.</param>
        /// <param name="commandService">Command service to add command to, not null.</param>
        private SearchCommand(AsyncPackage package, OleMenuCommandService commandService)
        {
            this.package = package ?? throw new ArgumentNullException(nameof(package));
            commandService = commandService ?? throw new ArgumentNullException(nameof(commandService));

            var menuCommandID = new CommandID(CommandSet, CommandId);
            var menuItem = new MenuCommand(this.Execute, menuCommandID);
            commandService.AddCommand(menuItem);
        }

        /// <summary>
        /// Gets the instance of the command.
        /// </summary>
        public static SearchCommand Instance
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the service provider from the owner package.
        /// </summary>
        private Microsoft.VisualStudio.Shell.IAsyncServiceProvider ServiceProvider
        {
            get
            {
                return this.package;
            }
        }

        /// <summary>
        /// Initializes the singleton instance of the command.
        /// </summary>
        /// <param name="package">Owner package, not null.</param>
        public static async Task InitializeAsync(AsyncPackage package)
        {
            // Switch to the main thread - the call to AddCommand in SearchCommand's constructor requires
            // the UI thread.
            await ThreadHelper.JoinableTaskFactory.SwitchToMainThreadAsync(package.DisposalToken);

            DteInstance = await package.GetServiceAsync(typeof(DTE)) as DTE;
            OutputWindow = await package.GetServiceAsync(typeof(SVsGeneralOutputWindowPane)) as IVsOutputWindowPane;
            InfoBarService.Initialize(package);
            Assumes.Present(DteInstance);

            OleMenuCommandService commandService = await package.GetServiceAsync(typeof(IMenuCommandService)) as OleMenuCommandService;
            Instance = new SearchCommand(package, commandService);
        }

        /// <summary>
        /// This function is the callback used to execute the command when the menu item is clicked.
        /// See the constructor to see how the menu item is associated with this function using
        /// OleMenuCommandService service and MenuCommand class.
        /// </summary>
        /// <param name="sender">Event sender.</param>
        /// <param name="e">Event args.</param>
        //String oldUrl;
        private void Execute(object sender, EventArgs e)
        {
            Debug.WriteLine("Send to debug output.");
            ThreadHelper.ThrowIfNotOnUIThread();
            var options = package.GetDialogPage(typeof(WebSearchOptionsPage)) as WebSearchOptionsPage;
            var url = options.SearchEngineUrl;
            var useVSBrowser = options.UseVSBrowser;
            var allowProposal = options.allowProposal;
            var textSelection = DteInstance?.ActiveDocument?.Selection as TextSelection;

            //var dsada = options.SearchEngine;
            if (textSelection == null)
            {
                DteInstance.StatusBar.Text = "The selection is null or empty.";
                return;
            }
            var textToSearch = textSelection?.Text?.Trim();
            var searchUrl = "google.com";
            if (!string.IsNullOrWhiteSpace(textToSearch))
            {
                var encodedTextToSearch = HttpUtility.UrlEncode(textToSearch);
                var searchingStatusTexg = $"Searching: {textToSearch}";
                DteInstance.StatusBar.Text = searchingStatusTexg;
                OutputWindow.OutputStringThreadSafe(searchingStatusTexg);
                searchUrl = url + encodedTextToSearch;
                // vsNavigateOptionsNewWindow opens the search in a new visual studio tab
                // vsNavigateOptionsDefault opens the search in the same visual studio tab
            }

            if (oldSearchUrl != options.SearchEngine)
            {
                InfoBarService.Instance.ShowInfoBar(oldSearchUrl + " has been changed to " + options.SearchEngine, 1);
            }

            if (allowProposal && url!= "https://www.telerik.com/search?q=")
            {
                //1st approach

                VSProject theVSProject = (VSProject)DteInstance.Solution.Projects.Item(1).Object;
                References refs = theVSProject.References;

                List<string> refList = new List<string>();
                foreach (Reference aRef in refs)
                {
                    refList.Add(aRef.Identity);
                }
                String[] packageReferences = refList.ToArray();
                foreach(var i in packageReferences)
                {
                    if(i.Contains("Telerik"))
                    {
                        InfoBarService.Instance.ShowInfoBar("Do you want to use TelerikSearchEngine?", 2);
                        break;
                    }
                }

                //2nd approach
                //var componentModel = (IComponentModel)Package.GetGlobalService(typeof(SComponentModel));
                //IVsPackageInstallerServices installerServices = componentModel.GetService<IVsPackageInstallerServices>();
                //var installedPackages = installerServices.GetInstalledPackages();
                //Debug.WriteLine("package name " + installedPackages.GetType().GetProperties().GetValue(1));

            }

            if (useVSBrowser)
            {
                DteInstance.ItemOperations.Navigate(searchUrl, vsNavigateOptions.vsNavigateOptionsNewWindow);
            }
            else
            {
                System.Diagnostics.Process.Start(searchUrl);
            }

            oldSearchUrl = options.SearchEngine;
        }

        

       
    }
}
