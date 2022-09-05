import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const CreateRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      const updateHotel = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      res.status(200).json("Room has been created successfully");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.roomid);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.roomid },
      });
      res
        .status(200)
        .json("Room has been deleted successfully(also from the hotel) 🤓👻👽");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateroom = await Room.findByIdAndUpdate(
      req.params.roomid,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateroom);
    res.status(200).json("Room has been updated successfully");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomid);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
