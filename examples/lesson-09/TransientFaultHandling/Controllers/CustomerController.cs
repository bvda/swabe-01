using Microsoft.AspNetCore.Mvc;

namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController: ControllerBase {

  private readonly IHttpClientFactory _httpClientFactory;

  public CustomerController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

  [HttpGet]
  public async Task<ActionResult> OnGetAsync() {
    var result = await _httpClientFactory.CreateClient("PollyWaitAndRetry").GetAsync("");
    return new StatusCodeResult((int)result.StatusCode);
  }
}

