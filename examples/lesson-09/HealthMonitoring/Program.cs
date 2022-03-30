using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;
using HealthChecks.UI.Client;

using HealthMonitoring.Controllers;
using HealthMonitoring.Data;
using HealthMonitoring.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<UserHealthCheck>();
builder.Services.AddSingleton<UserController>();

// Add database contexts to the container.
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(
    builder.Configuration["ConnectionStrings:UserDb"])
);

// Add health checks to the container.
builder.Services.AddHealthChecks()
    .AddDbContextCheck<UserDbContext>(
        tags: new[] { "iam" })
    .AddSqlServer(
        connectionString: builder.Configuration["ConnectionStrings:DataDb"],
        name: "DataDb",
        failureStatus: Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Degraded,
        tags: new[] { "data" })
    .AddSqlServer(
        connectionString: builder.Configuration["ConnectionStrings:UserDb"],
        name: "UserDb",
        failureStatus: Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Degraded,
        tags: new[] { "iam" })
    .AddCheck<UserHealthCheck>("Users", 
        tags: new[] { "iam" })
    .AddCheck<StartupHealthCheck>("Startup", 
        tags: new[] { "data" });

builder.Services.AddHealthChecksUI(config =>
{
  config.SetEvaluationTimeInSeconds(10);
  config.SetMinimumSecondsBetweenFailureNotifications(60);
}).AddInMemoryStorage();

builder.Services.AddControllers();

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
app.UseHealthChecksUI(config => config.UIPath = "/hc-ui");
app.UseHealthChecks("/data", new HealthCheckOptions
{
  Predicate = x => x.Tags.Contains("data"),
  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
app.UseHealthChecks("/iam", new HealthCheckOptions
{
  Predicate = x => x.Tags.Contains("iam"),
  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
app.MapHealthChecks("/healthz");
app.MapHealthChecks("/live", new HealthCheckOptions()
{
  Predicate = _ => false,
  ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});

app.MapControllers();

app.Run();
