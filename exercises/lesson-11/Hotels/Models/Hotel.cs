namespace Hotels.Models;

public class Hotel
{
  public int HotelId { get; set; }
  public string? Name { get; set; }

  public string? Description { get; set; }

  public HashSet<Review> Reviews { get; set; } = new HashSet<Review>();
}
