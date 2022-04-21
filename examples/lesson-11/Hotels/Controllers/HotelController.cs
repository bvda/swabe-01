using Microsoft.AspNetCore.Mvc;

namespace Hotels.Controllers;

[ApiController]
[Route("[controller]")]
public class HotelController : ControllerBase
{
    private readonly ILogger<HotelController> _logger;

    public HotelController(ILogger<HotelController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetHotels")]
    public IActionResult Get()
    {
        return Ok();
    }
}
