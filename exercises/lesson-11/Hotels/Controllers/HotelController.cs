using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hotels.Models;

namespace Hotels.Controllers;

[ApiController]
[Route("[controller]")]
public class HotelController : ControllerBase
{
    private readonly ILogger<HotelController> _logger;
    private readonly HotelDbContext _context;

    public HotelController(ILogger<HotelController> logger, HotelDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("")]
    public async Task<ActionResult<List<Hotel>>> OnGetAsync()
    {
        return await _context.Hotels.Include(r => r.Reviews).ToListAsync();
    }

    [HttpGet("most_visited")]
    public async Task<ActionResult<List<Hotel>>> OnGetHotelsWithTenReviewsAsync(int count)
    {
        return await _context.Hotels.ToListAsync(); // TODO Fix this handler
    }
}
