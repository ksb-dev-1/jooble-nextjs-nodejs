import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Skills = new Schema({
  skills: {
    type: [String],
    default: "",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model("Skills", Skills);
