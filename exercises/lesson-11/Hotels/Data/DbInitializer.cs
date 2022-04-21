using System.Text.Json;

using Hotels.Models;

namespace Hotels.Data;

public static class DbInitializer
{
  public static void Initialize(HotelDbContext context)
  {
    if (context.Hotels.Any())
    {
      return;
    }

    var reviews = JsonSerializer.Deserialize<List<Review>>(File.ReadAllText("MOCK_REVIEWS.json"), new JsonSerializerOptions {
      PropertyNameCaseInsensitive = true
    });

    if(reviews is not null) {
      foreach(var r in reviews) {
        context.Add(r);
      }
      context.SaveChanges();
    }

    var hotels = JsonSerializer.Deserialize<List<Hotel>>(File.ReadAllText("MOCK_HOTELS.json"), new JsonSerializerOptions {
      PropertyNameCaseInsensitive = true
    });

    if(hotels is not null) {
      foreach(var h in hotels) {
        context.Add(h);
      }
      context.SaveChanges();
    }

    var hotelEntities = context.Hotels.Select(x => x).ToList();
    var reviewEntities = context.Reviews.Select(x => x).ToList();
    foreach(var h in hotelEntities) {
      h.Reviews = new HashSet<Review>();
      h.Reviews.UnionWith(Enumerable.Range(1, new Random().Next(1, 11)).Select(index => reviewEntities[new Random().Next(0, reviewEntities.Count)]));
    }
    context.SaveChanges();
  }
}
