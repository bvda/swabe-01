# Lesson 02 exercises
## Exercise 02-1
### Get the template
Create a new repository in GitHub based on [this](https://github.com/bvda/node-with-typescript) template.

1. Install the dependencies `npm install` or `npm i` (shorthand notation)
2. Open `index.ts` and setup an express<sup>(<a href="">docs</a>)</sup> app with the following routes:
    - `GET /orders`
    - `POST /orders`
    - `GET /orders/:uid`
    - `PUT /orders/:uid`
    - `UPDATE /orders/:uid`  
    - `DELETE /orders/:uid`
3. Test everything with Postman<sup>(<a href="https://www.postman.com/">docs</a>)</sup> to make sure everything is working as expected (you can just return an empty response for now. We will add real functionalty later)

## Exercise 02-2
### Install MongoDB and Mongoose
1. Make sure you have MongoDB up and running on your computer. See [this](https://docs.mongodb.com/manual/installation/) guide for information.
2. Install Mongoose in the project with `npm install mongoose` 
3. Add files for the following routes (make sure to follow the best practices<sup>(<a href="https://github.com/expressjs/express/tree/master/examples/route-separation">docs</a>)</sup>
4. Set up a connection to your MongoDB with a Mongoose connection<sup>(<a href="https://mongoosejs.com/docs/connections.html">docs</a>)</sup>

## Exercise 02-3
### Implement Mongoose model and schema
1. Add a schema<sup>(<a href="https://mongoosejs.com/docs/guide.html">docs</a>)</sup> for an order to the project (see the JSON structure below)
2. Set up an endpoint that seeds the database with the contents of `MOCK_DATA_MATERIALS.json`

```json
{
  "material": "Plastic",
  "amount": 8345839,
  "currency": "CNY",
  "price": 624.83,
  "delivery":{
    "first_name": "Jeniffer",
    "last_name": "Adam",
    "address":{
      "street_name": "Blaine",
      "street_number": "48649",
      "city": "Linxi"
      }
    }
  }
}
```

## Exercise 02-4
### Add CRUD operations
Now we have everything set up to implement the functionality in our endpoints.

We want to be able to add filters based on query parameters to the `GET /orders` endpoint.

The query parameters:
- `t`—defines the end date
- `f`—defines the start date
- `m`–defines material

Can you come up with more possible query parameters? Implement them!

_Hint: Check out `examples/lesson-02/hello-mongoose/src/transaction-controller.ts` for inspiration_
