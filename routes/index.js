import express from "express";
import {
  filteredBySector,
  filteredByTopic,
  filteredByYear,
  getAllData,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Site",
    data: "We have data",
  });
});

router.get("/all", getAllData);

router.get("/year/:year", filteredByYear);

router.get("/topic/:topic", filteredByTopic);

router.get("/sector/:sector", filteredBySector);

export default router;
