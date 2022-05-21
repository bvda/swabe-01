# Lesson 14 Exercise
## Ticket system with Firebase
In this exercise, we will create a ticket system to get into the market just before the music festival scene will return to full power after a two-year pause due to COVID-19.

Due to time, we will not have the time to set up self-hosted servers and services in the cloud. So to make sure we will be ready in three hours, our development team has decided we will build it with Firebase.

### Exercise 14.01
#### Set up Firebase emulator
The first thing we need is to setup a local development environment, so we do not need to swipe a credit card.

The first order of business is to install the necessary development tools:
1. Install Firebase CLI[^2], so we can work seamlessly from the terminal
2. Create a folder on our machine and install and configure[^1] a local Firebase Emulator suite.
    - Run `firebase emulators init`Add Authentication[^3], Firestore[^4], Storage[^5], and Functions[^6] to the emulator

### Exercise 14.02
#### Firebase functions
1. Remember to build your Cloud functions manually (run `npm run build` in `functions/`)

[^1]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[^2]: https://firebase.google.com/docs/cli
[^3]: https://firebase.google.com/docs/emulator-suite/connect_auth
[^4]: https://firebase.google.com/docs/emulator-suite/connect_firestore
[^5]: https://firebase.google.com/docs/emulator-suite/connect_storage
[^6]: https://firebase.google.com/docs/emulator-suite/connect_functions
