using System.Web.Mvc;

namespace SecureLink.Controllers
{
    public class CentralController : Controller
    {
        // Vulnerable endpoint due to missing CSRF protection
        // POST: /Central/AlterState
        [HttpPost]
        public ActionResult AlterState(string stateValue) // Line  -> 10
        {
            // Potential CSRF vulnerability: stateValue comes directly from user input (request)
            if (!string.IsNullOrEmpty(stateValue))
            {
                // Application state-altering functionality
                // This could be anything from changing user settings, modifying data, etc.
                ApplicationState.AlterState(stateValue); // Line with application state altering functionality

                // Return success response
                return Json(new { success = true, newState = stateValue });
            }
            else
            {
                // Return error response
                return Json(new { success = false, message = "Invalid state value." });
            }
        }
    }

    public static class ApplicationState
    {
        public static void AlterState(string newState)
        {
            // Simulate altering application state
            // In a real application, this would update the state in the database or application memory
            System.Diagnostics.Debug.WriteLine($"Application state changed to: {newState}");
        }
    }
}
