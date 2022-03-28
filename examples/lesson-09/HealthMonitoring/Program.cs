using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using HealthMonitoring.HealthChecks;
using HealthChecks.UI.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHealthChecks()
    .AddCheck<UsersHealthCheck>("Users", tags: new[] {"iam"})
    .AddCheck<StartupHealthCheck>("Startup", tags: new[] {"infrastructure"});

builder.Services.AddHealthChecksUI().AddInMemoryStorage();

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
app.UseHealthChecks("/infrastructure", new HealthCheckOptions {
    Predicate = x => x.Tags.Contains("infrastructure"),
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
app.UseHealthChecks("/users", new HealthCheckOptions {
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
