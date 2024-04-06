import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { mongoDB } from "./database/index.js";
import articleRouter from "./routes/index.js";

config();

const app = express();

mongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/data", articleRouter);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "All good",
    data: "Hello World!",
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
