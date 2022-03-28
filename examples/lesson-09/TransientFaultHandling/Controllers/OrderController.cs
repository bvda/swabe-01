using Microsoft.AspNetCore.Mvc;

namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller")]
public class OrderController: ControllerBase {

  private readonly IHttpClientFactory _httpClientFactory;

  public OrderController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

  public async Task<Object> OnGetAsync() {
    return await _httpClientFactory.CreateClient("PollyWaitAndRetry").GetAsync("");
  }
}