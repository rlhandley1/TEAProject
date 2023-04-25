using api.Models;
using MySql.Data.MySqlClient;
using api.Database;
namespace api.CRUDFunctions
{
    public class UpdateCar
    {
        private string cs;
        public UpdateCar()
        {
            ConnectionString connectionString = new ConnectionString();
            cs = connectionString.cs;
        }
        public void Update(int CarVIN, Cars myCars)
        {
            using var con = new MySqlConnection(cs);
            con.Open();
            string stm = @"UPDATE cars SET carName = @carName, Price = @Price, Mpg = @Mpg, ShortDescrip = @ShortDescrip, Mile_Range = @Mile_Range, horse_power = @horse_power, drive = @drive, transmission = @transmission, color  = @color, seat = @seat , isDeleted = @isDeleted  WHERE VIN= @VIN";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@VIN", CarVIN);
            cmd.Parameters.AddWithValue("@carName", myCars.carName);
            cmd.Parameters.AddWithValue("@Price", myCars.carPrice);
            cmd.Parameters.AddWithValue("@Mpg", myCars.mpg);
            cmd.Parameters.AddWithValue("@ShortDescrip", myCars.shortDescrip);
            cmd.Parameters.AddWithValue("@Mile_Range", myCars.carRange);
            cmd.Parameters.AddWithValue("@horse_power", myCars.horsePower);
            cmd.Parameters.AddWithValue("@drive", myCars.drive);
            cmd.Parameters.AddWithValue("@transmission", myCars.transmission);
            cmd.Parameters.AddWithValue("@color", myCars.color);
            cmd.Parameters.AddWithValue("@seat", myCars.seat);
            cmd.Parameters.AddWithValue("@isDeleted", myCars.isDeleted);
            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    }
}

