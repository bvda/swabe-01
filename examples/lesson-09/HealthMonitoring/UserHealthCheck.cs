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
    Console.WriteLine(_isReady);
    return Task.FromResult(_isReady ? HealthCheckResult.Healthy() : HealthCheckResult.Unhealthy());
  }
}