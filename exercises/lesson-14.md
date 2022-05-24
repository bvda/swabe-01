# Lesson 14 Exercise
## Ticket system with Firebase
In this exercise, we will create a ticket system to get into the market just before the festival scene will return to full power after a two-year pause due to COVID-19.

We do not have the time to set up self-hosted servers and services in the cloud. So to make sure we will be ready in three hours, our development team has decided we will build it with Firebase.

### Exercise 14.01
#### Set up Firebase emulator
The first thing we need is to setup a local development environment. Firebase offers a fully-featured emulator that allows us to run our serverless setup locally to make sure that everything is correct, before we go all-in with our product (and our credit card) in an production environment in the cloud.

The first order of business is to install the necessary development tools:
1. Install Firebase CLI[^2], so we can work seamlessly from the terminal
2. Create a folder on our machine and install and configure[^1] a local Firebase Emulator suite for our project.
    - Run `firebase init` and setup a Firebase project with the following: Firestore, Function, and Hosting (choose to create a new project)
    - Run `firebase emulators:init`Add Authentication[^3], Firestore[^4], and Functions[^6] to the emulator
3. Start the emulator with `firebase emulators:start`
4. Check that everything is up and running @ http://localhost:4000

### Exercise 14.02
#### Firebase Admin SDK
With the Emulator is up and running, let's introduce the Firebase Admin SDK[^10]. We'll just go with the standard configuration, but remember to review the settings if you're using it in "real" projects.

1. Add Firebase Admin Node.js SDK[^7] to the project (should already be a part of the project if initialized correctly, otherwise run `npm i firebase-admin` in your functions root directory)
2. Initialize the SDK
    ```node
    import { initializeApp } from "firebase-admin/app";
    ...
    initializeApp();
    ```

With the app initialized, we're ready to proceed with the implement, and we will have all (configured) Firebase features at our disposal. We can now access Firestore and Authentication in the endpoints we'll implement below 👇

### Exercise 14.03
#### Firebase Cloud Functions
The first thing we need is to set up endpoints, where we can create users and bookings. We will be using Express[^9] that we have working with throughout this course to build our endpoints

The Firebase documentation[^8] has some great documentation on how to use Express[^9] with Cloud Functions, and by using Express, we can leverage the knowledge we have gotten through this course to get to market in no time! 

Implement the following endpoints and mount the in `src/index.ts`:

Users:
- `POST /`—Creates a user (use `admin.auth().createUser({email, password})`)

Bookings:
- `POST /`—Creates a booking (use Firestore as a database)
- `PATCH /:uid`–Updates a booking
- `DELETE /:uid`–Deletes a booking

You can build your Cloud functions manually (run `npm run build` in `functions/`) or start a watch script `npm run build:watch` what builds the code when changes are detected in the directory. The emulator will auto-deploy your functions after building them.

> Note: Any time you write to the same document that triggered a function, you are at risk of creating an infinite loop. Use caution and ensure that you safely exit the function when no change is needed.

### Exercise 14.04
#### Setting up triggers
Now that we have some endpoints that interacts with Authentication and Firestore, it's time to add some triggers to perform automated tasks when bookings are altered and users are created in our system.

Let's create a log for bookings, so we are able to track changes made to each individual booking.

Add a trigger for the following events[^11]:
- `onCreate` that trigger each time a booking is created
- `onUpdate` that trigger each time a booking is updated
- `onDelete` that trigger each time a booking is deleted
- `onCreate` that trigger each time a user is created

Each of the booking triggers should write to `logs` collection with the delta (see the `change` parameter in the callback). The user trigger should create a document in a collection named `users` with the data from the `POST` request (excluding the password).

### Exercise 14.05
#### Authorization for `booking` endpoint methods
Right now, any one can invoke our endpoints. But it would be nice, if we could stop anyone with access to the web to be able to update and/or delete our bookings.

If you get stuck, check out the `authorized-https-endpoint`[^12] example from Firebase's offical GitHub repository. 

We'll need to get some tokens issued with the Firebase Client SDK. Use this snippet to create and issue ID Tokens from the client side (replace the content of `public/index.html`):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Firebase Hosting</title>
    <script defer src="/__/firebase/9.8.1/firebase-app-compat.js"></script>
    <script defer src="/__/firebase/9.8.1/firebase-auth-compat.js"></script>    
    <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
    <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
    <script defer src="/__/firebase/init.js?useEmulator=true"></script>
  </head>
  <body>

    <p id="load">Firebase SDK Loading&hellip;</p>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const loadEl = document.querySelector('#load');
        try {
          let app = firebase.app();
          let features = [
            'auth', 
          ].filter(feature => typeof app[feature] === 'function');
          
          const auth = app.auth();
          auth.useEmulator("http://localhost:9099");
          
          var ui = new firebaseui.auth.AuthUI(firebase.auth());
          ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
              signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                firebase.auth().currentUser.getIdToken().then(token => {
                  loadEl.textContent = token;
                  loadEl.style.display = 'block';
                })
                return false;
              },
              uiShown: function() {
                loadEl.style.display = 'none';
              }
            }
          });
        } catch (e) {
          console.error(e);
          loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }
      });
    </script>
    <div id="firebaseui-auth-container"></div>
  </body>
</html>
```

- Write some middleware that checks the ID token (use ` admin.auth().verifyIdToken()`)

[^1]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[^2]: https://firebase.google.com/docs/cli
[^3]: https://firebase.google.com/docs/emulator-suite/connect_auth
[^4]: https://firebase.google.com/docs/emulator-suite/connect_firestore
[^6]: https://firebase.google.com/docs/emulator-suite/connect_functions
[^7]: https://www.npmjs.com/package/firebase-admin
[^8]: https://firebase.google.com/docs/functions/http-events#using_existing_express_apps
[^9]: http://expressjs.com/
[^10]: https://firebase.google.com/docs/admin/setup
[^11]: https://firebase.google.com/docs/functions/firestore-events
[^12]: https://github.com/firebase/functions-samples/tree/main/authorized-https-endpoint
