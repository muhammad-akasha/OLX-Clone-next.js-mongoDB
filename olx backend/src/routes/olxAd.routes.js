import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addOlxAd,
  findCategoryAd,
  getAdById,
  getUsersPublishedAds,
  searchByInp,
  searchItem,
} from "../controllers/ad.controllers.js";

const router = express.Router();

router.post("/addolxad", upload.array("images", 10), addOlxAd);
router.post("/getcategory", findCategoryAd);
router.post("/getads", getUsersPublishedAds);
router.post("/getadbyid", getAdById);
router.post("/getbysearch", searchByInp);
router.post("/searchitem", searchItem);

export default router;
