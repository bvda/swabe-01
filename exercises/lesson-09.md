# Lesson 09 exercises
## Exercise 09-1
### Setup Polly
1. Add Polly to your project
2. Setup a Retry with exponential backoff with jitter[^1]

## Exercise 09-2
### Setup health monitoring
Next up, we're going to setup endpoint monitoring for our controllers.

1. Copy the following class into a file called UserHealthCheck

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

## Exercise 09-3
### Add a circuit breaker
1. Add a circuit breaker that opens after three (3) failures, stays open for 10 seconds before switching to half-open [^2][^3]

[^1]: https://github.com/App-vNext/Polly/wiki/Retry-with-jitter
[^2]: https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
[^3]: https://github.com/App-vNext/Polly#circuit-breaker