import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const client = new MongoClient(process.env.mongoDBURL);
const db = client.db("articles").collection("reports");

const reqError = {
  success: false,
  message: "Data not found!",
};

const serverError = {
  success: false,
  message: "Internal Server error",
};

export const getAllData = async (req, res) => {
  try {
    const allData = await db.find().toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: "All data fetched",
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(serverError);
  }
};

export const filteredByYear = async (req, res) => {
  try {
    const { year } = req.params;
    if (year.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "Invalid Year",
      });
    }
    const allData = db.find({
      $or: [
        { start_year: parseInt(year) },
        { end_year: parseInt(year) },
        { published: { $regex: year, $options: "i" } },
        { added: { $regex: year, $options: "i" } },
      ],
    });
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    const resData = await allData.toArray();
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${year}`,
      data: resData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(serverError);
  }
};

export const filteredByTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    if (topic.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic",
      });
    }
    const allData = await db
      .find({ topic: { $regex: topic, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${topic}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredBySector = async (req, res) => {
  try {
    const { sector } = req.params;
    if (sector.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid Sector",
      });
    }
    const allData = await db
      .find({ sector: { $regex: sector, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${sector}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    if (region.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid region",
      });
    }
    const allData = await db
      .find({ region: { $regex: region, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${region}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid title",
      });
    }
    const allData = await db
      .find({ title: { $regex: title, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${title}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    if (country.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid country",
      });
    }
    const allData = await db
      .find({ country: { $regex: country, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${country}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredByPest = async (req, res) => {
  try {
    const { pestle } = req.params;
    if (pestle.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid pestle",
      });
    }
    const allData = await db
      .find({ pestle: { $regex: pestle, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${pestle}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredBySource = async (req, res) => {
  try {
    const { source } = req.params;
    if (source.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid source",
      });
    }
    const allData = await db
      .find({ source: { $regex: source, $options: "i" } })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${source}`,
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json(serverError);
  }
};

export const filteredByAny = async (req, res) => {
  try {
    const { search } = req.params;
    if (search.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid search",
      });
    }
    const allData = await db
      .find({
        $or: [
          { sector: { $regex: search, $options: "i" } },
          { topic: { $regex: search, $options: "i" } },
          { insight: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
          { pestle: { $regex: search, $options: "i" } },
          { source: { $regex: search, $options: "i" } },
          { url: { $regex: search, $options: "i" } },
        ],
      })
      .toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json(reqError);
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by search ${search}`,
      data: allData,
    });
  } catch (e) {
    return res.status(500).json(serverError);
  }
};
