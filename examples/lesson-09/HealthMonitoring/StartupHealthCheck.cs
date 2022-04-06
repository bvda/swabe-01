using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace HealthMonitoring.HealthChecks;

public class StartupHealthCheck : IHealthCheck 
{
  public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
  {
    return Task.FromResult(HealthCheckResult.Healthy());
  }
}