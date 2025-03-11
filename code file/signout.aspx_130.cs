using System;
using System.Web.UI;

namespace Central.Layouts.Central
{
    public partial class signout : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Some code here
        }

        protected void btnSignOut_Click(object sender, EventArgs e)
        {
            // Anonymously create a cookie
            HttpCookie cookie = new HttpCookie("cookie");
            cookie.Value = "some_value";
            cookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(cookie); // Vulnerability: Missing "httpOnly" attribute   ->  19
            Response.Redirect("~/Home.aspx"); // Redirect to home page
        }
    }
}
