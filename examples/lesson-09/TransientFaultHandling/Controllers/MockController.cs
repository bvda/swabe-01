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

  public Task<IActionResult> OnGet() {
    var rand = (EndpointState)new Random().Next(0,4);
    IActionResult result = new BadRequestResult();
    switch (rand) {
      case EndpointState.Fail:
        result = new BadRequestResult();
        break;
      case EndpointState.Ok:
        result = new OkResult();
        break;
      case EndpointState.Slow:
        result = new UnprocessableEntityResult();
      break;
    }
    var sleep = new Random().Next(50,150);
    Console.WriteLine(sleep);
    Thread.Sleep(sleep);
    return Task.FromResult<IActionResult>(result);
  }
}