import express from "express";
import {
  filteredByAny,
  filteredByCountry,
  filteredByPest,
  filteredByRegion,
  filteredBySector,
  filteredBySource,
  filteredByTitle,
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

router.get("/title/:title", filteredByTitle);

router.get("/sector/:sector", filteredBySector);

router.get("/country/:country", filteredByCountry);

router.get("/region/:region", filteredByRegion);

router.get("/pestle/:pestle", filteredByPest);

router.get("/source/:source", filteredBySource);

router.get("/any/:search", filteredByAny);

export default router;
