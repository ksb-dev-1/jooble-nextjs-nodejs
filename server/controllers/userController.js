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

const editUserProfile = async (req, res) => {
  const {
    image,
    first_name,
    last_name,
    location,
    mobile_no,
    available_to_join,
    password,
    confirmPassword,
  } = req.body;

  console.log(image);

  console.log(
    first_name,
    last_name,
    location,
    mobile_no,
    available_to_join,
    password,
    confirmPassword
  );

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
  editUserProfile,
  updateUserEmail,
  updateUserPassword,
};
