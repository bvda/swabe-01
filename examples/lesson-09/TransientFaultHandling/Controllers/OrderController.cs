using Microsoft.AspNetCore.Mvc;

namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController: ControllerBase {

  private readonly IHttpClientFactory _httpClientFactory;

  public OrderController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

  public async Task<ActionResult> OnGetAsync() {
    var result = await _httpClientFactory.CreateClient("PollyMultiple").GetAsync("");
    return new StatusCodeResult((int)result.StatusCode);  }
}