using MySql.Data.MySqlClient;
namespace api.Database
{
    public class database

    {
        private string cs { get; }

        private string stm { get; set; }

        public database()

        {
            ConnectionString connectionString = new ConnectionString();
            cs = connectionString.cs;

        }

        //test connection to deployed mysql database by selecting database version

        public void TestConnection()

        {
            using var con = new MySqlConnection(cs);

            con.Open();

            stm = "select VERSION()";

            using var cmd = new MySqlCommand(stm, con);

            string version = cmd.ExecuteScalar().ToString();

            System.Console.WriteLine($"Connection Successful.\nMySql Version: {version}");

            //con.Close();

        }

        //make sure database cn be queried properly

        public void TestCarQuery()

        {
            using var con = new MySqlConnection(cs);

            con.Open();

            stm = "SELECT VIN, carName, Price, Mpg, ShortDescrip, Mile_Range, horse_power, drive, transmission, color, seat, isDeleted FROM cars";

            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

        }

        public void TestCustomerQuery()

        {
            using var con = new MySqlConnection(cs);

            con.Open();

            stm = "SELECT id, fName, lName, phone, email, expDate FROM customers";

            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

        }
          public void TestAdminQuery()

        {
            using var con = new MySqlConnection(cs);

            con.Open();

            stm = "SELECT adminid,admin_pass  FROM cars";

            using var cmd = new MySqlCommand(stm, con);

            using MySqlDataReader rdr = cmd.ExecuteReader();

        }
    }
}