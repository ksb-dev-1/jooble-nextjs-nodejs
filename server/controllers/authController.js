// 3rd party
import { StatusCodes } from "http-status-codes";

// models
import User from "../models/User.js";
import Token from "../models/Token.js";

// errors
import CustomError from "../errors/index.js";

import jwtUtils from "../utils/index.js";
import crypto from "crypto";

const registerUser = async (req, res) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new CustomError.BadRequestError("You must enter all the fields.");
  }

  if (password !== confirmPassword) {
    throw new CustomError.BadRequestError("Confirm Pawssword doesn't match.");
  }

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:3000";
  // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

  await jwtUtils.sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
    //verificationToken: user.verificationToken,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  if (user.isVerified) {
    throw new CustomError.BadRequestError("User already verified");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  //user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const loginUser = (req, res) => {
  res.send("Login user");
};

const logoutUser = (req, res) => {
  res.send("Logout user");
};

const forgotPassword = (req, res) => {
  res.send("Forgot password");
};

const resetPassword = (req, res) => {
  res.send("Reset password");
};

export {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
};
