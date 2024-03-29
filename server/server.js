import express from "express";
import dotenv from "dotenv";

// db
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
