using Microsoft.EntityFrameworkCore;

namespace HealthMonitoring.Data
{
  public class UserDbContext : DbContext
  {
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {
    }

    public DbSet<User> WeatherForecasts => Set<User>();
  }
}