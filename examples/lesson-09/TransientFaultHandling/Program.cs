using Polly;

var builder = WebApplication.CreateBuilder(args);

IAsyncPolicy<HttpResponseMessage> fallbackPolicy =
    Policy.HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
        .FallbackAsync(FallbackAction, OnFallbackAsync);

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
).AddPolicyHandler(fallbackPolicy);

builder.Services.AddHttpClient(
  "PollyFallback",
  client => {
    client.BaseAddress = new Uri("http://localhost:5000/mock");
  }
).AddPolicyHandler(fallbackPolicy);

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

Task OnFallbackAsync(DelegateResult<HttpResponseMessage> response, Context context)
{
    Console.WriteLine("About to call the fallback action. This is a good place to do some logging");
    return Task.CompletedTask;
}

Task<HttpResponseMessage> FallbackAction(DelegateResult<HttpResponseMessage> responseToFailedRequest, Context context, CancellationToken cancellationToken)
{
    Console.WriteLine("Fallback action is executing");

    HttpResponseMessage httpResponseMessage = new HttpResponseMessage(responseToFailedRequest.Result.StatusCode)
    {
        Content = new StringContent($"The fallback executed, the original error was {responseToFailedRequest.Result.ReasonPhrase}")
    };
    return Task.FromResult(httpResponseMessage);
}