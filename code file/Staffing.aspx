using System;
using System.Web.UI;

namespace Central
{
    public partial class Staffing : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // Untrusted data source
                string timezoneval = Request.QueryString["timezoneval"];
                
                // Vulnerable method
                Literal1.Text = anony_14861f96(timezoneval);
            }
        }

        private string anony_14861f96(string val)
        {
            // Line 1519: Embedding untrusted data directly in output
            return $"<div>{val}</div>";  ->  23
        }
    }
}
