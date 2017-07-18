using TestStaff.Dal.Abstract;
using System.Data;
using System.IO;
using System.Text;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TestStaff.Admin.Controllers
{
    public class ReportingController : Controller
    {
        private readonly IReportingRepository _reportingRepository;
        public ReportingController(IReportingRepository repo)
        {
            _reportingRepository = repo;
        }
        public ActionResult Index(int testId)
        {
            DataTable dt = _reportingRepository.GetReport(testId);
            GridView gridview = new GridView();
            gridview.DataSource = dt; 
            gridview.DataBind();
            Response.ClearContent();
            Response.Buffer = true;         
            Response.AddHeader("content-disposition", "attachment;filename =report.xls");
            Response.ContentType = "application/ms-excel";
            Response.ContentEncoding = Encoding.UTF8;
            Response.BinaryWrite(System.Text.Encoding.UTF8.GetPreamble());

            using (StringWriter sw = new StringWriter())
            {
                using (HtmlTextWriter htw = new HtmlTextWriter(sw))
                {
                    gridview.RenderControl(htw);
                    Response.Output.Write(sw.ToString());
                    Response.Flush();
                    Response.End();
                }
            }
            return View();
            
        }
    }
}