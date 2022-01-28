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

## Exercise 01-3
### Setting up `nodemon`
Were you getting tired of constantly restarting your application manually when you did Exercise 01-3?

Add `nodemon`<sup>(<a href="https://github.com/remy/nodemon">docs</a>)</sup> as a development dependency and see what happens when you change your files.

1. Run `npm install --save-dev nodemon`
2. Setup script in `package.json` where you use `nodemon` to start the application (see `examples/hello-node/package.json` for inspiration)
3. Run the script in your terminal 
4. Go change something in `index.js` and see when happens

## Exercise 01-4
### Serving static files

## Exercise 01-5
### Express POST

