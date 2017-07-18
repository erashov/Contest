using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ContestsClients.Admin
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Contests",
                url: "{controller}/{action}/{name}",
                defaults: new { controller = "Admin", action = "Index", name = UrlParameter.Optional }
            );
        }
    }
}