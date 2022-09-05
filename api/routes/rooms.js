import express from "express";
import { verifyAdmin } from "./../utils/verifyToken.js";
import {
  CreateRoom,
  getRoom,
  deleteRoom,
  getAllRoom,
  updateRoom,
} from "./../controllers/room.js";
const router = express.Router();

//CreateRoom
router.post("/:hotelid", verifyAdmin, CreateRoom);

// updateRoom
router.put("/:roomid", verifyAdmin, updateRoom);

//delete room
router.delete("/:hotelid/:roomid", verifyAdmin, deleteRoom);

//get room
router.get("/:roomid", verifyAdmin, getRoom);

//get all room
router.get("/", verifyAdmin, getAllRoom);
export default router;
