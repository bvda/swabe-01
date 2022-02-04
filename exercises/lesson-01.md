# Lesson 01 exercises
## Exercise 01-1 
### Install Node.js and Postman
Before we can start building great APIs, we need to make sure everything is up and running.

1. Go to https://nodejs.org/en/ and grap the latest Long Term Support (LTS) version of Node.js for your operating system.

Fire up your favorite terminal (Bash, Z shell, PowerShell, Command Prompt, etc.) and make sure the versions checks out with the following commands:

- `node -v` (should print at least `v16.13.2`)
- `npm -v` (should print something like `8.3.1`)

If everthing checks out, we are ready to rumble!

Since the focus of this course will be to build APIs it is a good idea to have some sort of tool to test the endpoints we are building. Here we recommend Postman, get it @ https://www.postman.com/.

## Exercise 01-2
### Hello, Node.js

1. Create a new directory for your application
2. Create a main file for your application (usually, the main file is called `index.js`, but it can be anything)
3. Run `npm init`<sup>(<a href="https://docs.npmjs.com/cli/v8/commands/npm-init">docs</a>)</sup> in the directory to create a `package.json` file
4. Open `index.js` and copy/paste the code from `examples/hello-node/hello-node.js`
5. Run the application with `node index.js`
6. Add another endpoint at `/ping`, which responds with `pong`
7. Test it out using Postman
8. Write comments in your own words in the file explaining each statement and/or function(s)

## Exercise 01-3
### Setting up `nodemon`
Were you getting tired of constantly restarting your application manually when you did Exercise 01-2?

Add `nodemon`<sup>(<a href="https://github.com/remy/nodemon">docs</a>)</sup> as a development dependency and see what happens when you change your files.

1. Run `npm install --save-dev nodemon`
2. Setup script in `package.json` where you use `nodemon` to start the application (see `examples/hello-node/package.json` for inspiration)
3. Run the script in your terminal 
4. Go change something in `index.js` and write down what happens (check the terminal)

## Exercise 01-4
### Building your first Express API
Now that we have tinkered with the basic building blocks in Node.js, it is time to build something a bit more complex. We will be introducing Express.js<sup>(<a href="http://expressjs.com/">docs</a>)</sup> to help increase our productivity.

1. Follow steps 1-3 from Exercise 01-2 to create a fresh package (You can add `nodemon` as well, if you feel like it)
2. Add Express.js to the package (run `npm i express` in the package root directory)
3. Inspect the in `examples/hello-node/http-methods-and-routes.js` and implement the API with Express.js
    - An endpoint at `/` with `GET` and `POST` that returns data with `Content-Type: text/plain`
    - An endpoint at `/json` with `GET` and `POST` that returns data with `Content-Type: application/json`
    - There should be a separate `Router` for each endpoint (see `examples/multi-router`)
4. Write down the main differences between the vanilla Node.js and Express.js implementation.

_Hints: Problems parsing HTTP bodies? Check out https://github.com/expressjs/body-parser for more information_