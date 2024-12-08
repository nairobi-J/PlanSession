import express from "express";
const router = express.Router();
import {
  authUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller/user.js";
import { protect } from "../middlewear/auth.js";

router.route("/").post(registerUser).get(protect);
router.post("/login", authUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
//router
//.route("/:id")
//.delete(protect, admin, deleteUser)
//.get(protect, admin, getUserById)
//.put(protect, admin, updateUser);

export default router;
