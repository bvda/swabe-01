using Microsoft.EntityFrameworkCore;
using Hotels.Models;

public class HotelDbContext : DbContext
{
  public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
  {
  }

  public DbSet<Hotel> Hotels => Set<Hotel>();
  public DbSet<Review> Reviews => Set<Review>();
}