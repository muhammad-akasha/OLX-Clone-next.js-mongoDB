import express from "express";
import {
  getUserDetail,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  uploadImage,
} from "../controllers/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import authenticateUser from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refreshtoken", refreshToken);
router.post("/uploadimage", upload.single("image"), uploadImage);
router.get("/auth", authenticateUser);
router.post("/getuser", getUserDetail);

export default router;
