using api.Database;
using api.Models;
using MySql.Data;
using MySql.Data.MySqlClient;
namespace api.CRUDFunctions
{
    public class DeleteCar
    {
        private string cs;
        public DeleteCar()
        {
            ConnectionString connectionString = new ConnectionString();
            cs = connectionString.cs;
        }

        //when delete request is received, find the driver and set that driver's deleted status to 'y' (soft delete)
        public void DeleteOneByID(int CarVIN, Cars myCars)
        {
            System.Console.WriteLine($"The car with an VIN of {CarVIN} will be deleted");

            using var con = new MySqlConnection(cs);
            con.Open();

            using var cmd = new MySqlCommand();
            cmd.Connection = con;
            cmd.CommandText = @"UPDATE cars 
                SET isDeleted = 1
                WHERE VIN = @VIN";
            cmd.Parameters.AddWithValue("@VIN", CarVIN);
            cmd.Prepare();

            try
            {
                cmd.ExecuteNonQuery();
                System.Console.WriteLine("Car has been deleted");
            }
            catch
            {
                System.Console.WriteLine("Deletion was unsuccessful.");
            }

            // con.Close();
        }
    }
}