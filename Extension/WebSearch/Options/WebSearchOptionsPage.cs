using Microsoft.VisualStudio.Shell;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.InteropServices;
using DisplayNameAttribute = System.ComponentModel.DisplayNameAttribute;

namespace WebSearch.Options
{
    [Guid("612341eb-1bdf-43fa-9fac-e0369afe9c4c")]
    public class WebSearchOptionsPage : DialogPage
    {
        private static readonly Dictionary<SearchEngine, string> engines = new Dictionary<SearchEngine, string>()
        {
            {SearchEngine.Google, "https://www.google.com/search?q=" },
            {SearchEngine.Bing, "https://www.bing.com/search?q=" },
            {SearchEngine.StackOverflow, "https://stackoverflow.com/search?q=" },
            {SearchEngine.MSDN, "https://docs.microsoft.com/en-in/search/?search=&category=All" },
            {SearchEngine.TelerikSearchEngine, "https://www.telerik.com/search?q=" }
        };

        [DisplayName("User Agent")]
        [DefaultValue(true)]
        [Category("General")]
        [Description("An option indicating whether Visual Studio browser is used or the default system browser.")]
        [Browsable(true)]
        public bool UseVSBrowser { get; set; }

        [DisplayName("Propose Search Engine")]
        [DefaultValue(false)]
        [Category("General")]
        [Description("This option allows proposing a search engine")]
        [Browsable(true)]
        public bool allowProposal { get; set; }

        [DisplayName("Search Engine")]
        [DefaultValue(SearchEngine.Google)]
        [Category("General")]
        [Description("Select a search engine")]
        [TypeConverter(typeof(EnumConverter))]
        [Browsable(true)]
        public SearchEngine SearchEngine { get; set; } = SearchEngine.Google;

        [Browsable(false)]
        public string SearchEngineUrl
        {
            get
            {
                var url = engines[this.SearchEngine];
                return url;
            }
        }
    }
}
