using System.Web.Optimization;

namespace TestStaff.Front.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            var main = new ScriptBundle("~/bundles/main").
                Include("~/scripts/jquery-2.1.1.min.js").
                Include("~/Scripts/common.js");

            var cssBundle = new StyleBundle("~/bundles/css/app").
                Include("~/css/bootstrap-3.3.7-dist/css/bootstrap.min.css").
                Include("~/css/common.css");

            bundles.Add(cssBundle);
            bundles.Add(main);
        }
    }
}