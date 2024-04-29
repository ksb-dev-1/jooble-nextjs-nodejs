import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Skill = new Schema(
  {
    skills: {
      type: [String],
      default: "",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Skill", Skill);
