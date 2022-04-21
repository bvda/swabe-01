namespace Hotels.Models;

public class Review
{
  public int ReviewId { get; set; }
  public float Stars { get; set; }

  public string? Comment { get; set; }
}
