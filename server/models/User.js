import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import validator from "validator";

const { Schema, model } = mongoose;
const { genSalt, hash, compare } = bcryptjs;
const { isEmail } = validator;

const UserSchema = new Schema(
  {
    image: {
      type: String,
      default: "",
    },
    name: {
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
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
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
      default: "",
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await compare(canditatePassword, this.password);
  return isMatch;
};

export default model("User", UserSchema);
