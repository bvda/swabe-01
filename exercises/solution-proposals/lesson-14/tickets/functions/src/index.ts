import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.post("/", express.json(), (req, res) => {
  const {data} = req.body;
  db.collection("data").add(req.body);
  res.send(data);
});

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from SWABE!");
});

export const endpoint = functions.https.onRequest(app);

export const doclogsTrigger = functions.firestore.document("logs/doc1/doclogs/{docId}").onCreate((snap, context) => {
  return db.collection("logs").add({"added": "stuff"});
});
