using Microsoft.AspNetCore.Mvc;

using Polly.CircuitBreaker;

namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController: ControllerBase {

  private readonly IHttpClientFactory _httpClientFactory;

  public OrderController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

  public async Task<ActionResult> OnGetAsync() {
    try {
      var result = await _httpClientFactory.CreateClient("PollyCircuitBreaker").GetAsync("");
      return new StatusCodeResult((int)result.StatusCode);  
    } catch (BrokenCircuitException e) {
      Console.WriteLine(e.Message);
      return new StatusCodeResult(StatusCodes.Status451UnavailableForLegalReasons);
    }
  }
}