import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const JobSchema = new Schema(
  {
    company_name: {
      type: String,
      required: [true, "Please provide company name"],
    },
    location: {
      type: String,
      required: [true, "Please provide company location"],
    },
    experience: {
      type: String,
      required: [true, "Please provide experience required"],
      default: "any",
    },
    role: {
      type: String,
      required: [true, "Please provide job role"],
    },
    openings: {
      type: Number,
      required: [true, "Please provide number of openings"],
    },
    posted: {
      type: Date,
      default: Date.now,
    },
    skills: {
      type: [String],
      required: [true, "Please provide required skills"],
    },
    job_type: {
      type: String,
      enum: ["full time", "part time", "contract", "internship"],
      default: "full time",
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    company_type: {
      type: String,
      enum: ["mnc", "startup"],
    },
    industry_type: {
      type: [String],
      required: [true, "Please provide industry type"],
    },
    education: {
      type: [String],
      default: "any",
    },
    benefits: {
      type: [String],
      default: "none",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Job = model("Job", JobSchema);

export default Job;
