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