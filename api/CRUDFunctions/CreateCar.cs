using api.Database;
using api.Models;
using MySql.Data.MySqlClient;
namespace api.CRUDFunctions
{
    public class CreateCar
    {
        private string cs;
        public CreateCar()
        {
            ConnectionString connectionString = new ConnectionString();
            cs = connectionString.cs;
        }
        public void CreateOne(Cars myCars)
        {
            System.Console.WriteLine("creating Car ....");
            System.Console.WriteLine(myCars.ToString());
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO cars (VIN, carType, carName, carImage, Price, Mpg, ShortDescrip, Mile_Range, horse_power, drive, transmission, color, seat, isDeleted) VALUES (default, @carType, @carName, @carImage, @Price, @Mpg, @ShortDescrip, @Mile_Range, @horse_power, @drive, @transmission, @color, @seat, default)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@carType", myCars.carType);
            cmd.Parameters.AddWithValue("@carName", myCars.carName);
            cmd.Parameters.AddWithValue("@carImage", myCars.carImage);
            cmd.Parameters.AddWithValue("@Price", myCars.carPrice);
            cmd.Parameters.AddWithValue("@Mpg", myCars.mpg);
            cmd.Parameters.AddWithValue("@ShortDescrip", myCars.shortDescrip);
            cmd.Parameters.AddWithValue("@Mile_Range", myCars.carRange);
            cmd.Parameters.AddWithValue("@horse_power", myCars.horsePower);
            cmd.Parameters.AddWithValue("@drive", myCars.drive);
            cmd.Parameters.AddWithValue("@transmission", myCars.transmission);
            cmd.Parameters.AddWithValue("@color", myCars.color);
            cmd.Parameters.AddWithValue("@seat", myCars.seat);
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