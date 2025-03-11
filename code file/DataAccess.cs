// File: /checkmarxmasterscan-CentralProjeForInfosec/Central/DAL/DataAccess.cs

using System;
using System.Data.SqlClient;

namespace Central.DAL
{
    public class DataAccess
    {
        // Vulnerable connection string with hardcoded credentials at line 28
        private static string connectionString = "Data Source=BAEDWDEVTESTSQL.citiustech.com;Initial Catalog=Central;User ID=CTEDbUserTest;password=fy5vpwecTH;Integrated Security=False;";  // -> 11

        // Constructor
        public DataAccess()
        {
        }

        // Vulnerable method using the hardcoded connection string to create a SQL connection at line 42
        public SqlConnection GetSQLConnection()   // -> 19
        {
            SqlConnection connection = new SqlConnection(connectionString);
            try
            {
                connection.Open();
                return connection;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
                return null;
            }
        }

        // Other methods interacting with the database
    }
}
