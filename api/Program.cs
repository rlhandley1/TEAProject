using api.Database;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("OpenPolicy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
TestDatabase();
// Data mydata = new Data();
// mydata.CreateSongTable();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("OpenPolicy");

app.MapControllers();

app.Run();

//Need this becuase SQL was breaking

void TestDatabase()

{
    database db = new database();

    try
    {
        System.Console.WriteLine("Testing database connection...");
        db.TestConnection();
    }

    catch
    {
        System.Console.WriteLine("Connection failed. Please update the connection string.");
    }

    try
    {
        System.Console.WriteLine("Testing database...");
        db.TestCarQuery();
    }

    catch
    {
        System.Console.WriteLine("Car's table does not exist. Creating table...");
    }

}
