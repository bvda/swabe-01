using Polly;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddHttpClient("PollyWaitAndRetry", client =>
{
  client.BaseAddress = new Uri("http://localhost:5000/mock");
  client.Timeout = TimeSpan.FromMilliseconds(100);
}).AddTransientHttpErrorPolicy(
    builder => builder.WaitAndRetryAsync(3, retryCount => {
        return TimeSpan.FromMilliseconds(500);
    }, onRetry: (outcome, timespan, retryAttempt, context) => {
        Console.WriteLine("Retry");
    }));

builder.Services.AddHttpClient("PollyMultiple", client =>
{
  client.BaseAddress = new Uri("http://localhost:5000/mock");
}).AddTransientHttpErrorPolicy(
    builder => builder.RetryAsync(3))
.AddTransientHttpErrorPolicy(
    builder => builder.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));

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
