using System;
using System.IO;
using System.Web;
using System.Web.UI;

namespace CentralProjeForInfosec
{
    public partial class Tableau : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Initialize the page
            InitializePage();

            // Other code ...

            // Vulnerability at line 37: retrieving dynamic data from QueryString
            string fileName = Request.QueryString["fileName"];

            // Some other code ...

            try
            {
                // Vulnerability at line 54: using the dynamic data in a file path
                string filePath = Path.Combine(Server.MapPath("~/uploads/"), fileName);
                
                if (File.Exists(filePath))
                {
                    // Read and process the file
                    string fileContent = File.ReadAllText(filePath);
                    Response.Write(fileContent);
                }
                else
                {
                    Response.Write("File not found.");
                }
            }
            catch (Exception ex)
            {
                Response.Write("An error occurred: " + ex.Message);
            }

            // More code ...
        }

        private void InitializePage()
        {
            // Initialization logic
            Response.Write("Page Initialization");
        }

        protected void Button_Click(object sender, EventArgs e)
        {
            // Button click logic
            Response.Write("Button clicked");
        }

        private void LogError(Exception ex)
        {
            // Error logging logic
            File.AppendAllText(Server.MapPath("~/logs/error.log"), ex.ToString());
        }
    }
}




