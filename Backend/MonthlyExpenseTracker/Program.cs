using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MonthlyExpenseTracker.Models;
using MonthlyExpenseTracker.Models.ContosoUniversity.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200") // Allow Angular
                        .AllowAnyMethod()  // Allow GET, POST, PUT, DELETE
                        .AllowAnyHeader()  // Allow Content-Type, Authorization
                        .AllowCredentials()); // If using authentication
});
// Add services to the container.
builder.Services.AddDbContext<ExpenseTrackerDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowAngularApp");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ExpenseTrackerDbContext>();
        SeedData.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Create a scope to get the DbContext and initialize data


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
