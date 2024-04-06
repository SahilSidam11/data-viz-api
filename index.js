import express from "express";
import { port, mongoDBURL } from "./config.js";
import { MongoClient } from "mongodb";

const app = express();
const client = new MongoClient(mongoDBURL);
var articles;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(235).send("Welcome to the site.");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/all", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("articles").collection("news");
    articles = await collection.find({}).toArray();
    res.send(articles);
  } catch (error) {
    console.log(error.message);
  } finally {
    client.close();
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

run();
