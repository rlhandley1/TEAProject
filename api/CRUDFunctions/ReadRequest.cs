using api.Models;
using api.Database;
using MySql.Data.MySqlClient;

namespace api.CRUDFunctions
{
    public class ReadRequest
    {
        public List<Requests> GetRequests()
        {

            System.Console.WriteLine("getting customers ....");
            List<Requests> AllRequests = new List<Requests>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT cr.car, cr.fName, cr.lName, cr.email, c.carName as interested_in FROM car_request cr JOIN cars c ON (cr.car = c.VIN)";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            System.Console.WriteLine("about to query ....");
            try
            {
                while (rdr.Read())
                {
                    Requests request = new Requests()
                    {
                        car = rdr.GetInt32(0),

                        fName = rdr.GetString(1),

                        lName = rdr.GetString(2),

                        email = rdr.GetString(3),

                    };

                    AllRequests.Add(request);
                    System.Console.WriteLine(request.ToString());

                }
                System.Console.WriteLine("query sucessful");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex);
                System.Console.WriteLine("query unsuccessful");
            }

            con.Dispose();
            return AllRequests;
        }
    }
}