using api.Database;
using api.Models;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace api.CRUDFunctions
{
    public class CreateCarRequest
    {
        private string cs;
        public CreateCarRequest()
        {
            ConnectionString connectionString = new ConnectionString();
            this.cs = connectionString.cs;
        }
        //insert new request into database
        public void CreateOne(Requests myRequests2)
        {
            System.Console.WriteLine("creating Request ....");
            System.Console.WriteLine(myRequests2.ToString());

            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"INSERT INTO car_request(car,fName,lName,email) VALUES (@car,@fName, @lName, @email)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@car", myRequests2.car);
            cmd.Parameters.AddWithValue("@fName", myRequests2.fName);
            cmd.Parameters.AddWithValue("@lName", myRequests2.lName);
            cmd.Parameters.AddWithValue("@email", myRequests2.email);
            // cmd.Parameters.AddWithValue("@expDate", myRequests.expDate);
            cmd.Prepare();
            try
            {
                cmd.ExecuteNonQuery();
                System.Console.WriteLine("successfully posted request”");
            }
            catch
            {
                con.Close();
                System.Console.WriteLine("unsuccessful");
            }

        }
    }
}