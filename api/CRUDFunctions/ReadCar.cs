using api.Models;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Data;
using api.Database;
namespace api.CRUDFunctions
{
    public class ReadCar
    {
        public List<Cars> GetCars()
        {

            System.Console.WriteLine("getting cars ....");
            List<Cars> AllCars = new List<Cars>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT VIN, carType, carName, carImage, Price, Mpg, ShortDescrip, Mile_Range, horse_power, drive, transmission, color,seat, isDeleted FROM cars;";
            using var cmd = new MySqlCommand(stm, con);
            using MySqlDataReader rdr = cmd.ExecuteReader();

            System.Console.WriteLine("about to query ....");
            try
            {
                while (rdr.Read())
                {
                    Cars car = new Cars()
                    {

                        carVIN = rdr.GetInt32(0),

                        carType = rdr.GetString(1),

                        carName = rdr.GetString(2),

                        carImage = rdr.GetString(3),

                        carPrice = rdr.GetDouble(4),

                        mpg = rdr.GetInt32(5),

                        shortDescrip = rdr.GetString(6),

                        carRange = rdr.GetInt32(7),

                        horsePower = rdr.GetInt32(8),

                        drive = rdr.GetString(9),

                        transmission = rdr.GetString(10),

                        color = rdr.GetString(11),

                        seat = rdr.GetInt32(12),

                        isDeleted = rdr.GetBoolean(13)
                    };

                    AllCars.Add(car);
                    System.Console.WriteLine(car.ToString());

                }
                System.Console.WriteLine("query sucessful");
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine(ex);
                System.Console.WriteLine("query unsuccessful");
            }

            con.Dispose();
            return AllCars;
        }
        public Cars GetOnebyVIN(int CarVIN)
        {
            System.Console.WriteLine("looking for the car ....");
            Cars myCar = new Cars();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT VIN, carType, carName, carImage, Price, Mpg, ShortDescrip, Mile_Range, horse_power, drive, transmission, color,seat, isDeleted FROM cars;";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@VIN", myCar.carVIN);
            cmd.Prepare();
            try
            {
                using MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                        myCar.carVIN = rdr.GetInt32(0);

                        myCar.carType = rdr.GetString(1);

                        myCar.carName = rdr.GetString(2);

                        myCar.carImage = rdr.GetString(3);

                        myCar.carPrice = rdr.GetDouble(4);

                        myCar.mpg = rdr.GetInt32(5);

                        myCar.shortDescrip = rdr.GetString(6);

                        myCar.carRange = rdr.GetInt32(7);

                        myCar.horsePower = rdr.GetInt32(8);

                        myCar.drive = rdr.GetString(9);

                        myCar.transmission = rdr.GetString(10);

                        myCar.color = rdr.GetString(11);

                        myCar.seat = rdr.GetInt32(12);

                        myCar.isDeleted = rdr.GetBoolean(13);
                }

                    System.Console.WriteLine("The result of the search was: ");
                    System.Console.WriteLine(myCar.ToString());

             }catch (System.Exception ex)
            {
                System.Console.WriteLine(ex);
                System.Console.WriteLine("query unsuccessful");
            }

            // con.Dispose();
            return myCar;
        }
    }

}


