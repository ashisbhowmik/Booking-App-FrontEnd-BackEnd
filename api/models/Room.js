import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      require: true,
    },
    roomNumbers: {
      type: [{ number: Number, unavaliableDates: { type: [Date] } }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
