import jwt from "jsonwebtoken";
import OlxAd from "../models/olxAd.model.js";
import User from "../models/usermodel.js";

const getUserDetail = async (req) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) return console.log("no refresh token found!");

  const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
  const user = await User.findOne({ email: decodedToken.email });
  if (!user) {
    return console.log("User Not Found!");
  }
  return user;
};

const findCategoryAd = async (req, res) => {
  const { category, limit } = req.body;

  if (!category || !limit) {
    return res.status(400).json({ message: "Category is required." });
  }

  try {
    // Fetch ads based on category
    const allAds = await OlxAd.find({ category }).limit(limit);

    // Return success response
    res.status(200).json({
      message: "Ads fetched successfully",
      total: allAds.length,
      data: allAds,
    });
  } catch (error) {
    console.error("Error fetching ads by category:", error);
    res.status(500).json({
      message: "Failed to fetch ads",
      error: error.message,
    });
  }
};

const getUsersPublishedAds = async (req, res) => {
  try {
    // Get user details
    const user = await getUserDetail(req);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Populate the published ads
    await user.populate("publishedAd");

    // Send response
    res.status(200).json({
      message: "Published ads fetched successfully",
      data: user.publishedAd,
    });
  } catch (error) {
    console.error("Error fetching published ads:", error);
    res.status(500).json({
      message: "Failed to fetch published ads",
      error: error.message,
    });
  }
};

const searchItem = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Please add Title" });
  }

  try {
    const response = await OlxAd.find({
      adTitle: title,
    }).limit(7);

    res.status(200).json({
      response,
      message: "Search data retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error, please try again later",
    });
  }
};

export {
  addOlxAd,
  findCategoryAd,
  getUsersPublishedAds,
  getAdById,
  searchByInp,
  searchItem,
};
