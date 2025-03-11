// File: /checkmarxmasterscan-CentralProjeForInfosec/Central/New folder/Layouts/Layouts/Central/Tableau.aspx.cs

using System;
using System.IO;
using System.Web;

namespace Central
{
    public partial class Tableau : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) // Line 18   ->  11
        {
            // Get dynamic data from the QueryString
            string fileName = Request.QueryString["fileName"]; // Line 19   ->  14

            if (!string.IsNullOrEmpty(fileName))
            {
                // Potentially vulnerable line of code
                string filePath = Path.Combine(Server.MapPath("~/Data/"), fileName); // Line 25  ->  19

                // Use the file path for local disk access
                if (File.Exists(filePath))
                {
                    // Process the file (e.g., read, display, etc.)
                    string fileContents = File.ReadAllText(filePath);
                    Response.Write(fileContents);
                }
                else
                {
                    Response.Write("File not found.");
                }
            }
            else
            {
                Response.Write("No file specified.");
            }
        }
    }
}

