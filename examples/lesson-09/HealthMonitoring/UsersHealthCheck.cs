using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthMonitoring.HealthChecks;

public class UsersHealthCheck : IHealthCheck 
{
  public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default) 
  {
    return Task.FromResult(
      HealthCheckResult.Healthy("A health result")
    );
  }
}