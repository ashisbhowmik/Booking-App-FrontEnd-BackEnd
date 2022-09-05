import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, You are now authenticated");
});
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send(
    "Hello user, You are now Logged in , and you can delete your account"
  );
});
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send(
    "Hello user, You are an Admin, You are now Logged in , and you can delete all account"
  );
});

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router;
