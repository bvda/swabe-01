using Microsoft.AspNetCore.Mvc;

namespace TransientFaultHandling.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController: ControllerBase {

  private readonly IHttpClientFactory _httpClientFactory;

  public CustomerController(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

  public async Task<Object> OnGetAsync() {
    return await _httpClientFactory.CreateClient("PollyMultiple").GetAsync("");
  }
}

