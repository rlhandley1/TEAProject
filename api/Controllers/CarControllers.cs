using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using api.Models;
using api.CRUDFunctions;
using api.Database;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        public List<Cars> AllCars = new List<Cars>();
        // GET: api/Course
        [HttpGet]
        public List<Cars> Get()
        {

            ReadCar ReadObject = new ReadCar();
            AllCars = ReadObject.GetCars();
            return AllCars;
        }

        // GET: api/Cars/5
        [HttpGet("{carVIN}", Name = "Cars")]
        public Cars Get(int carVIN)
        {
            //test
            System.Console.WriteLine("\nReceived request to find car by VIN...");
            ReadCar getOneCar = new ReadCar();
            return getOneCar.GetOnebyVIN(carVIN);
        }

        // POST: api/Cars
        [HttpPost] //CREATE
        public void Post([FromBody] Cars car)
        {
            CreateCar newCar = new CreateCar();
            newCar.CreateOne(car);
        }

        // PUT: api/Cars/5
        [HttpPut("{carVIN}")] //UPDATE
        public void Put(int carVIN, [FromBody] Cars car)
        {
            //test
            System.Console.WriteLine("\nReceived request to update car...");

            UpdateCar updateCarBehavior = new UpdateCar();
            System.Console.WriteLine("About to update");
            System.Console.WriteLine(car.ToString());
            updateCarBehavior.Update(carVIN, car);
        }

        // DELETE: api/Cars/5
        [HttpDelete("{carVIN}")]
        public void Delete(int CarVIN, Cars myCars)
        {
            System.Console.WriteLine("\nReceived request to delete a car...");

            DeleteCar deleteACar = new DeleteCar();
            deleteACar.DeleteOneByID(CarVIN, myCars);
        }
    }
}