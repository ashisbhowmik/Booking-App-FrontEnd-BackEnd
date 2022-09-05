import express from "express";
import {
  createHotel,
  getHotel,
  updateHotel,
  getAllHotel,
  deleteHotel,
  countHotelByCity,
  countByType,
} from "./../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET
router.get("/countHotelByCity", countHotelByCity);

//GET
router.get("/countByType", countByType);

//GET ALL
router.get("/", getAllHotel);

export default router;
