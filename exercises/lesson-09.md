# Lesson 09 exercises
## Exercise 09-1
### Setup Polly
1. Create a new .NET project using the ASP.NET Core WebAPI template[]
2. Add Polly to your project[^4]
3. Add new controller to the project named `MockController.cs` and copy the following code (or grap it @ `examples/lesson-09/TransientFaultHandling/Controllers/MockController.cs`):
    ```cs
    using Microsoft.AspNetCore.Mvc;

    namespace TransientFaultHandling.Controllers;

    [ApiController]
    [Route("[controller]")]
    public class MockController: ControllerBase {

      public enum EndpointState {
        Fail,
        Ok,
        Slow,
      }
      public MockController() {

      }
      [Route("success")]
      [HttpGet]
      public Task<StatusCodeResult> OnGetSuccess() {
        return Task.FromResult(new StatusCodeResult(StatusCodes.Status200OK));
      }

      [HttpGet]
      public Task<StatusCodeResult> OnGet() {
        var rand = (EndpointState)new Random().Next(0,3);
        var result = StatusCodes.Status418ImATeapot;
        switch (rand) {
          case EndpointState.Fail:
            result = StatusCodes.Status500InternalServerError;
            break;
          case EndpointState.Ok:
            result = StatusCodes.Status200OK;
            break;
          case EndpointState.Slow:
            result = StatusCodes.Status408RequestTimeout;
          break;
        }
        return Task.FromResult(new StatusCodeResult(result));
      }
    }
    ```
4. Setup a Retry with exponential backoff with jitter[^1] targeting the `GET /` route in `MockController.cs`. Make sure to use `IHttpClientFactory`[^9] to create a named client for the endpoint
5. Create a controller named `UserController`, inject `IHttpClientFactory` and implement an endpoint calling `GET /` on the instance
6. Test it out with Postman[^6]

## Exercise 09-2
### Setup health monitoring
Next up, we're going to setup endpoint monitoring for our controllers.

1. Copy the following code into a file called `UserHealthCheck.cs` (or grap it @ `examples/lesson-09/HealthMonitoring/UserHealthCheck.cs`):

    ```cs
    using Microsoft.Extensions.Diagnostics.HealthChecks;

    namespace HealthMonitoring.HealthChecks;

    public class UserHealthCheck : IHealthCheck 
    {

      private volatile bool _isReady = false;
      public bool IsReady { 
        get => _isReady;
        set => _isReady = value; 
      }

      public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default) 
      {
        return Task.FromResult(_isReady ? HealthCheckResult.Healthy() : HealthCheckResult.Unhealthy());
      }
    }
    ```

    Register `UserHealthCheck` as a service in `Program.cs` (so we can inject it in our controllers later)
2. In `UserController`, add an endpoint @ `GET /ready` that toggles the `IsReady` property in `UserHealthCheck`
3. Configure the `UserHealthCheck` health check and route it to `/hc-users`. There is a great guide[^7] @ Microsoft Docs
4. Test it out in a browser
5. Optional: Come back after finishing `Exercise 09-3` and set up the UI by following the guide[^8] @ GitHub (remember to read the whole section carefully, there are some hidden gems)

## Exercise 09-3
### Add a circuit breaker
1. Add a circuit breaker that opens after three (3) failures, stays open for 10 seconds before switching to a half-open state[^2][^3] (see `examples/lesson-09/TransientFaultHandling/Program.cs` for inspiration)

[^1]: https://github.com/App-vNext/Polly/wiki/Retry-with-jitter
[^2]: https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
[^3]: https://github.com/App-vNext/Polly#circuit-breaker
[^4]: https://www.nuget.org/packages/Microsoft.Extensions.Http.Polly
[^5]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new
[^6]: https://www.postman.com/
[^7]: https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/health-checks
[^8]: https://github.com/Xabaril/AspNetCore.Diagnostics.HealthChecks#HealthCheckUI
[^9]: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests