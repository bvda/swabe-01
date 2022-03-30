using Polly;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient(
    "PollyWaitAndRetry",
    client =>
    {
      client.BaseAddress = new Uri("http://localhost:5000/mock");
    }).AddTransientHttpErrorPolicy(
        builder => builder.WaitAndRetryAsync(
            3,
            retryCount => TimeSpan.FromMilliseconds(500),
            onRetry: (outcome, timespan, retryAttempt, context) => Console.WriteLine($"onRetry {outcome.Result.StatusCode} {outcome.Result.ReasonPhrase} {timespan} {retryAttempt}")
        )
    );

builder.Services.AddHttpClient(
    "PollyCircuitBreaker",
    client =>
    {
      client.BaseAddress = new Uri("http://localhost:5000/mock");
    }).AddTransientHttpErrorPolicy(
        builder => builder.CircuitBreakerAsync(
            5,
            TimeSpan.FromSeconds(5),
            onBreak: (outcome, timespan, context) => Console.WriteLine($"onBreak {outcome.Result.ReasonPhrase} {timespan}"),
            onHalfOpen: () => Console.WriteLine("onHalfOpen"),
            onReset: (context) => Console.WriteLine("onReset")
    )
);

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

app.MapControllers();

app.Run();
