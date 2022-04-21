# Lesson 11 exercise
## Exercise 11-1
### Get up and running
This exercise requires Docker[^1].

1. Boot up the project located @ `exercises/lesson-11/Hotels/Hotels.csproj` up in your favorite editor.
2. Setup a MSSQL Server yourself or run `docker compose up` in `exercises/lesson-11/Hotels/Hotels.csproj` to create a container that the project is already configured with (you might need to change your connection string in `exercises/lesson-11/Hotels/appsettings.Development.json` if you are running your setup)
3. Test that everything is running as excepted by hitting `https://localhost:5001/hotel` in Postman or from the Swagger page @ `https://localhost:5001/swagger/index.html`

## Exercise 11-2
### Set up instrumentation
The database sould be seeded with 2000 hotels that each hold 1-10 reviews of which there are 5000.

1. Setup simple logging[^2] and do not forget to enable sensitive data, so you get the full picture in anything goes wrong

## Exercise 11-3
### Add some queries

1. Add the following queries:
  - `GET` all hotels with 10 reviews
  - `GET` average rating for a hotel (searched by name)
2. Mae sure you apply the best practices[^3]

## Exercise 11-4
### Test the performance
Follow this [guide](https://anna-dolnyk.medium.com/performance-testing-with-postman-715fa0d717e3) to automate the performance testing 

## First aid
- If everything blows up in a rain of fire, delete your database with `dotnet ef database drop` and reboot the project to get some fresh seed data.

[^1]: https://www.docker.com/get-started/
[^2]: https://docs.microsoft.com/en-us/ef/core/logging-events-diagnostics/simple-logging
[^3]: https://docs.microsoft.com/en-us/aspnet/core/performance/performance-best-practices