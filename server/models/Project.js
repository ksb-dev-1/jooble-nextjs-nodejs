import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Project = new Schema(
  {
    project_name: {
      type: String,
      default: "",
    },
    details: {
      type: String,
      default: "",
    },
    hosted_link: {
      type: String,
      default: "",
    },
    github_link: {
      type: String,
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

export default model("Project", Project);
