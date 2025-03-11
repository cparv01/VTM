// File: /checkmarxmasterscan-CentralProjeForInfosec/SecureLink/Models/AccountBindingModels.cs

using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace SecureLink.Models
{
    public class AccountBindingModels
    {
        // Other properties and methods

        // Vulnerable Method: OldPassword
        public async Task<string> OldPassword(string username, string oldPassword)  ->  14
        {
            // Line 21: Sending user information outside the application
            var client = new HttpClient();
            var url = "http://example.com/api/checkpassword"; // External URL
            var content = new StringContent($"{{\"username\":\"{username}\", \"password\":\"{oldPassword}\"}}", System.Text.Encoding.UTF8, "application/json");

            // Send the user information in a POST request
            var response = await client.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new Exception("Error verifying old password.");
            }
        }

        // Other properties and methods
    }
}
