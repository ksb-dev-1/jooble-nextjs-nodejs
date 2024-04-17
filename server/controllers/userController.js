import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req, res) => {
  res.send("Get all users");
};

const getSingleUser = async (req, res) => {
  res.send("Get single user");
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUserProfile = async (req, res) => {
  res.send("Update user profile");
};

const updateUserEmail = async (req, res) => {
  res.send("Update user email");
};

const updateUserPassword = async (req, res) => {
  res.send("Update user password");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserProfile,
  updateUserEmail,
  updateUserPassword,
};
