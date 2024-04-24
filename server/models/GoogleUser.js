import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";

const { Schema, model } = mongoose;
const { genSalt, hash, compare } = bcryptjs;
const { isEmail } = validator;

const GoogleUserSchema = new Schema({
  googleId: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  first_name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: isEmail,
      message: "Please provide valid email",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  available_to_join: {
    type: String,
    default: "15 days",
  },
  mobile_no: {
    type: String,
    default: "Not provided",
  },
});

export default model("GoogleUser", GoogleUserSchema);
