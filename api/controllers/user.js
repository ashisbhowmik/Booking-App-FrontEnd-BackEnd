import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const newuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(newuser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully 😍😎");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (err) {
    next(err);
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const alluser = await User.find();
    res.status(200).json(alluser);
  } catch (err) {
    next(err);
  }
};
