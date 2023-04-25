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
    public class carRequestController : ControllerBase
    {
        public List<Requests> AllRequests = new List<Requests>();
        // GET: api/Course
        [HttpGet]
        public List<Requests> Get()
        {
            ReadRequest ReadObject = new ReadRequest();
            AllRequests = ReadObject.GetRequests();
            return AllRequests;
        }

        // GET: api/CarRequest/5
        [HttpGet("{CarVIN}", Name = "CarRequest")]
        public string GetOne(int id)
        {
            return "value";
        }

        // POST: api/CarRequest
        [HttpPost] //CREATE
        public void Post([FromBody] Requests request)
        {
        CreateCarRequest newRequest = new CreateCarRequest();
            newRequest.CreateOne(request);
        }

        // DELETE: api/CarRequest/5
        [HttpDelete("{CarVIN}")]
        public void Delete(int id)
        {
            System.Console.WriteLine(id);
        }
    }
}