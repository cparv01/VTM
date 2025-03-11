using System;
using System.Web;
using System.Web.SessionState;

namespace Central.DAL
{
    public class MySessionIDManager : SessionIDManager
    {
        public override void SaveSessionID(HttpContext context, string id, out bool redirected, out bool cookieAdded)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            redirected = false;
            cookieAdded = false;

            // Create a new cookie to store the session ID
            HttpCookie cookie = new HttpCookie(SessionIDManager.SessionIDCookieName, id);

            // Set the cookie properties (expiration time, etc.)
            cookie.Path = "/";
            cookie.Expires = DateTime.Now.AddMinutes(30);

            // Add the cookie to the response
            context.Response.Cookies.Add(cookie); // Vulnerable line (line 20)  ->  27
            cookieAdded = true;
        }
    }
}
