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
        //insert new song into database
        public void CreateOne(Requests myRequests)
        {
            System.Console.WriteLine("creating Request ....");
            System.Console.WriteLine(myRequests.ToString());

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO car_request(car,fName,lName,email,expDate) VALUES (@car, @fName, @lName, @email, @expDate)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@car", myRequests.car);
            cmd.Parameters.AddWithValue("@fName", myRequests.fNameInput);
            cmd.Parameters.AddWithValue("@lName", myRequests.lNameInput);
            cmd.Parameters.AddWithValue("@email", myRequests.email);
            cmd.Parameters.AddWithValue("@expDate", myRequests.expDate);
            cmd.Prepare();
            try
            {
                cmd.ExecuteNonQuery();
                System.Console.WriteLine("succesful");
            }
            catch
            {
                con.Close();

                System.Console.WriteLine("unsuccessful");
            }

        }
    }
}