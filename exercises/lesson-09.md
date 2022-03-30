# Lesson 09 exercises
## Exercise 09-1
### Setup Polly
1. Add Polly to your project
2. Setup a Retry with exponential backoff with jitter[^1]

## Exercise 09-2
### Setup health monitoring

## Exercise 09-3
### Add a circuit breaker
1. Add a circuit breaker that opens after three (3) failures, stays open for 10 seconds before switching to half-open [^2][^3]

[^1]: https://github.com/Polly-Contrib/Polly.Contrib.WaitAndRetry#wait-and-retry-with-jittered-back-off
[^2]: https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker
[^3]: https://github.com/App-vNext/Polly#circuit-breaker