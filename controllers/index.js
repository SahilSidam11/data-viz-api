import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const client = new MongoClient(process.env.mongoDBURL);
const db = client.db("articles").collection("reports");

export const getAllData = async (req, res) => {
  try {
    const allData = await db.find().toArray();
    if (!allData || allData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All data fetched",
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal Server error",
    });
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
      return res.status(400).json({
        success: false,
        message: "Data not found!",
      });
    }
    const resData = await allData.toArray();
    return res.status(200).json({
      success: true,
      message: "All data fetched",
      data: resData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal Server error",
    });
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
      return res.status(400).json({
        success: false,
        message: "Data not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All data fetched",
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal Server error",
    });
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
      return res.status(400).json({
        success: false,
        message: "Data not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All data fetched",
      data: allData,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Internal Server error",
    });
  }
};
