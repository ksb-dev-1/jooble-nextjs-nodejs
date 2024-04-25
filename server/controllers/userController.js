// 3rd party
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";

// models
import User from "../models/User.js";
import Token from "../models/Token.js";
import Skills from "../models/Skills.js";

// errors
import CustomError from "../errors/index.js";

import jwtUtils from "../utils/index.js";
import crypto from "crypto";

const getAllUsers = async (req, res) => {
  res.send("Get all users");
};

const getSingleUser = async (req, res) => {
  res.send("Get single user");
};

// ----- Show current user -----
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// ----- Edit user profile -----
const updateUserProfile = async (req, res) => {
  const {
    image,
    first_name,
    last_name,
    email,
    country,
    state,
    city,
    mobile_no,
    available_to_join,
  } = req.body;

  const user = await User.findOne({ email });
  let updatedUser = "";
  let imageUrl = "";

  if (image) {
    if (user.image !== "" && !image.startsWith("https")) {
      const avatar_url = user.image.split("/");
      const cloudinaryAvatarId = avatar_url[avatar_url.length - 1];

      await deleteCloudinaryAvatar(
        cloudinaryAvatarId.substring(0, cloudinaryAvatarId.length - 4)
      );
    }

    if (!image.startsWith("https")) {
      imageUrl = await uploadProfilePictureToCloudinary(image);
    }

    updatedUser = await User.findOneAndUpdate(
      { email },
      {
        image: imageUrl.secure_url,
        first_name: first_name !== "" ? first_name : user.first_name,
        last_name: last_name !== "" ? last_name : user.last_name,
        country: country !== "" ? country : user.country,
        state: state !== "" ? state : user.state,
        city: city !== "" ? city : user.city,
        mobile_no: mobile_no !== "" ? mobile_no : user.mobile_no,
        available_to_join:
          available_to_join !== "" ? available_to_join : user.available_to_join,
      }
    );
  } else {
    updatedUser = await User.findOneAndUpdate(
      { email },
      {
        first_name: first_name !== "" ? first_name : user.first_name,
        last_name: last_name !== "" ? last_name : user.last_name,
        country: country !== "" ? country : user.country,
        state: state !== "" ? state : user.state,
        city: city !== "" ? city : user.city,
        mobile_no: mobile_no !== "" ? mobile_no : user.mobile_no,
        available_to_join:
          available_to_join !== "" ? available_to_join : user.available_to_join,
      }
    );
  }

  const userAfterUpdate = await User.findOne({ email });

  const tokenUser = jwtUtils.createTokenUser(userAfterUpdate);

  // create refresh token
  let refreshToken = "";
  //check for existing token
  const existingToken = await Token.findOne({ user: userAfterUpdate._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    refreshToken = existingToken.refreshToken;

    jwtUtils.attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res
      .status(StatusCodes.OK)
      .json({ user: tokenUser, msg: "Profile updated successfully" });

    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  jwtUtils.attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: "Profile updated successfully" });
};

// ----- delete profile picture from cloudinary -----
const deleteCloudinaryAvatar = async (id) => {
  await cloudinary.api
    .delete_resources([`jooble/${id}`], {
      type: "upload",
      resource_type: "image",
    })
    .then(console.log);
};

// ----- upload profile picture to cloudinary -----
const uploadProfilePictureToCloudinary = async (image) => {
  const uploaded = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "unsigned_uploads",
      allowed_formats: ["png", "svg", "jpg", "webp", "jpeg", "ico", "jfif"],
      folder: "jooble",
    },
    function (error, result) {
      if (error) {
        console.log(error);
      }
      return result;
    }
  );
  return uploaded;
};

const getKeySkills = async (req, res) => {
  const skillsArray = await Skills.findOne({ user: req.user.userId });

  if (!skillsArray) {
    res.status(StatusCodes.OK).json({ msg: "Start adding skills" });
  }

  res.status(StatusCodes.OK).json({ skills: skillsArray.skills });
};

const updateKeySkills = async (req, res) => {
  const { skills, toDeleteSkills } = req.body;

  const skillsArray = await Skills.findOne({ user: req.user.userId });

  if (toDeleteSkills.length >= 1) {
    const filter = skillsArray.skills.filter(
      (skill) => !toDeleteSkills.includes(skill)
    );

    await Skills.findOneAndUpdate(
      { user: req.user.userId },
      { skills: filter }
    );

    //console.log(toDeleteSkills);
  }

  if (!skillsArray && skills) {
    //console.log(2);
    await Skills.create({
      skills: skills,
      user: req.user.userId,
    });
  } else {
    for (let i = 0; i < skills.length; i++) {
      if (!skillsArray.skills.includes(skills[i])) {
        //console.log(3);
        skillsArray.skills.push(skills[i]);
        await skillsArray.save();
      }
    }
  }

  res.status(StatusCodes.OK).json({ msg: "Key skills updated successfully" });
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
  getKeySkills,
  updateKeySkills,
  updateUserEmail,
  updateUserPassword,
};
