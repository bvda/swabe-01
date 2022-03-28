using Microsoft.AspNetCore.Mvc;
using HealthMonitoring.HealthChecks;

namespace HealthMonitoring.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase {
  private readonly ILogger<UserController> _logger;
  private readonly UserHealthCheck _check;
  public UserController(ILogger<UserController> logger, UserHealthCheck check) {
    _logger = logger;
    _check = check;
  }

  [HttpGet]
  public Task<IsReadyResponse> GetAsync() {
    _check.IsReady = !_check.IsReady;
    return Task.FromResult(new IsReadyResponse {
      IsReady = _check.IsReady
    });
  }

  public sealed class IsReadyResponse {
    public bool IsReady { get; set; }
  }
}