import { MongoClient } from "mongodb";

export const mongoDB = () => {
  const client = new MongoClient(process.env.mongoDBURL);
  client
    .connect()
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
